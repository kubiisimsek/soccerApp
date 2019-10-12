import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class EstimateService {

  constructor(private api:ApiService) { }

  matchList:[]=[];
  homeTeamMatchList:[]=[];
  awayTeamMatchList:[]=[];

   getMatchList(){

    // return new Promise((resolve,reject)=>{
    //   this.api.getEvents().subscribe(res=>{
    //     var events:any = Object.values(res.body.events);
    //     this.matchList=events.map(item=>item).filter(item=>item.leagueCode==="ABDK");
    
    //     for(var x of fakeList){
    //       // console.log(x);
    //       // this.calculate(x["homeTeamName"]).then((item:any)=>{
    //       //   x["homeFH"]=item.HFH;
    //       //   x["homeMR"]=item.HMR;
    //       // });
    //       // this.calculate(x["awayTeamName"]).then((item2:any)=>{
    //       //   x["awayFH"]=item2.HFH;
    //       //   x["awayMR"]=item2.HMR;  
    //       // });
    //     }

    //      resolve(fakeList);
    //   });       
    // });
  }

   /*
        Typescript asenkron bir dildir.Yani kod bloklarını inceleyip kısa sürenleri önce uzunları sonra işler.
        Bu fonksiyondadaki API'den gelen takımın fikstürü olsun gerekli hesaplamaları olsun uzun sürdüğünden başka fonksiyondan çağırıldığında
        buradan dönen değerleri undefined olarak bastırıyor.Bu yüzden observable ile subscribe'ı mümkün kılıp fonksiyon sonuçlanana kadar
        beklemesini sağladık.
  */
  async calculate(homeTeamName,awayTeamName):Promise<object>{
    var response:object={}; // Return variable
    

      var newHomeTeamName=this.TRtoEN(homeTeamName); // Convert to eng char
      var newAwayTeamName=this.TRtoEN(awayTeamName); // Convert to eng char

      // FOR HOMETEAM
      this.api.getFixture(newHomeTeamName).subscribe(items=>{
        var whenHomeFH=items["body"].filter(x=>x.homeTeamName==homeTeamName).map(x=>x.firstHalfScore); // Filter for home or away team and map firstHalfScore.       
        var arrayHomeFH=this.splitScores(whenHomeFH,true); //This func return array of all first half scores when team is host.
      
        var whenHomeMR=items["body"].filter(x=>x.homeTeamName==homeTeamName).map(x=>x.matchResult); // Filter for home or away team and map matchResult.
        var arrayHomeMR=this.splitScores(whenHomeMR,true); //This func return array of all match result scores when team is host.
       
        var sumHomeFH=0,sumHomeMR=0;
        sumHomeFH+=arrayHomeFH.reduce((a,b)=>a+b,0); // Sum all elements of array
        sumHomeMR+=arrayHomeMR.reduce((a,b)=>a+b,0); // Sum all elements of array
       
        var avgHomeFH = sumHomeFH / arrayHomeFH.length; // Average of first half scores     
        var avgHomeMR = sumHomeMR / arrayHomeMR.length; // Average of match result scores

        // Calculate Standart deviation and sum with average.Math.round() function returns the value of a number rounded to the nearest integer.
        response["HFH"]=Math.round(this.calculateStandartDeviation(avgHomeFH,arrayHomeFH.length,arrayHomeFH) + avgHomeFH -1);       
        response["HMR"]=Math.round(this.calculateStandartDeviation(avgHomeMR,arrayHomeMR.length,arrayHomeMR) + avgHomeMR -1);
        
      });  
      // FOR AWAYTEAM
      this.api.getFixture(newAwayTeamName).subscribe(items=>{
        var whenAwayFH=items["body"].filter(x=>x.awayTeamName==awayTeamName).map(x=>x.firstHalfScore);
        var arrayAwayFH=this.splitScores(whenAwayFH,false);
        var whenAwayMR=items["body"].filter(x=>x.awayTeamName==awayTeamName).map(x=>x.matchResult);
        var arrayAwayMR=this.splitScores(whenAwayMR,false);

        var sumAwayFH=0,sumAwayMR=0;
        sumAwayFH+=arrayAwayFH.reduce((a,b)=>a+b,0); // Sum all elements of array
        sumAwayMR+=arrayAwayMR.reduce((a,b)=>a+b,0); // Sum all elements of array

        var avgAwayFH = sumAwayFH / arrayAwayFH.length;
        var avgAwayMR = sumAwayMR / arrayAwayMR.length;

        
        response["AFH"]=Math.round(this.calculateStandartDeviation(avgAwayFH,arrayAwayFH.length,arrayAwayFH) + avgAwayFH-1);
        response["AMR"]=Math.round(this.calculateStandartDeviation(avgAwayMR,arrayAwayMR.length,arrayAwayMR) + avgAwayMR-1);
      })
      return await new Promise((resolve,reject)=>{ 
        if(response){
          resolve(response);
        }
      });
  }

  splitScores(scoreArray,isHome){
    var LeftorRight:number; // Scores coming string like "2-1".Should split string.If this value is 0 we get home team score
    var temp:number[]=[];
    isHome ? LeftorRight=0 : LeftorRight=1; // If team is home team or not
    for(let i of scoreArray){
     var spl = i.split("-");
     temp.push(+spl[LeftorRight]);
    }
    return temp;
  }

  calculateStandartDeviation(average,len,scoresArray){
    var sum=0;
    for(let i of scoresArray){
      var temp=average-i;
      sum+=Math.pow(temp,2);
    }
    return Math.sqrt( sum / (len-1) );
  }



  TRtoEN(team:string){ // CONVERT TURKISH CHAR TO ENG CHAR
    var tr={
      ç:"c",
      ö:"o",
      ş:"s",
      ı:"i",
      ü:"u",
      ğ:"g"
    };
    var str=team.toLowerCase();
    var str_arr=str.split('');
    for(var i=0;i<str_arr.length;i++){
      str_arr[i]=tr[str_arr[i]] || str_arr[i];
    }
    str=str_arr.join('');
    return str.replace(" ","-").replace(".","-").replace(/[^a-z0-9-.çöşüğı]/gi,"");
  }


}
