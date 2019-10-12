import { Component, OnInit } from '@angular/core';
import {ModalController,NavController} from '@ionic/angular';

// SERVICES
import{StorageService} from '../../services/storage.service';
import {ApiService} from '../../services/api.service';
import{ToastService} from '../../services/toast.service';
import {EstimateService} from '../../services/estimate.service';
// MODALS
import {PreviousModalPage} from '../../modals/previous-modal/previous-modal.page';
import {NewstatsModalPage} from '../../modals/newstats-modal/newstats-modal.page';
import {AddstatsModalPage} from '../../modals/addstats-modal/addstats-modal.page';


export class estimate {
  homeScoreFH:number;
  homeScoreMR:number;
  awayScoreFH:number;
  awayScoreMR:number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(
    private navController:NavController,
    private modalController:ModalController,
    private storage:StorageService,
    private toastService:ToastService,
    private apiService:ApiService,
    private estimateService:EstimateService
  ) { }

  ngOnInit() {
    
    this.storage.GET_SESSION().then(res=>{ 
      if(!res){
        this.navController.navigateRoot("/login");
      }
      else{
        this.SESSION=res[0];
        this.refreshAll();
        
      }
    })
    this.estimateScore();
  }

  
  fake:object[]=[
    {homeTeamName:"Fenerbahçe",awayTeamName:"Galatasaray"},
    {homeTeamName:"Beşiktaş",awayTeamName:"Trabzonspor"},
    {homeTeamName:"Malatyaspor",awayTeamName:"Başakşehir"},
    {homeTeamName:"Bursaspor",awayTeamName:"Alanyaspor"},
    {homeTeamName:"Konyaspor",awayTeamName:"Kasımpaşa"},
    {homeTeamName:"Sivasspor",awayTeamName:"Ankaragücü"},
  ]
  // VARIABLES
  SESSION:any; // USER INFORMATIONS

  matches:any=this.fake; // GET ALL MATCHES FROM API (NOW FAKE)
  leagueMatchList:[]=[]; // GET MATCHES ON SSLEAGUE FROM API


  selectedSegment:string; // SEGMENT VARIABLE
  selectedStatsID:string; // Selected stats (segment) id

  userStats:any; // GET ALL USER STATS FROM API
  statsPageNames:any=[]; // USER STATS NAME ARRAY
  statsInPage:any=[];
  showCards:boolean=false;



  matchList(){ // DROP DOWN CHANGE EVENT
    this.apiService.getEvents().subscribe(res=>{
      this.matches = Object.values(res.body.events);
      setTimeout(()=>{
        this.leagueMatchList=this.matches.map(item=>item).filter(item=>item.leagueName==="SSL"); 
      },2000);
    })
  }

  segmentChange(ev){ // SEGMENT(Top menu) CHANGE EVENT
    this.selectedSegment=ev.detail.value;
    this.showStats(this.selectedSegment);
  }

  showMatches():boolean{ // IF CONDITIONS HAVE BEEN PROVIDED,SHOW GAME OF THE WEEK
    if(this.selectedSegment=='games')
      return true;
    else
      return false;
  }


  estimateScore(){
    for(let x of this.fake){
        this.estimateService.calculate(x["homeTeamName"],x["awayTeamName"]).then((item:object)=>{
        x["estimated"]=item
      }); 
    }
  }

  
  showStats(value){
    if(value !== "games" && value !== undefined){
      this.statsInPage=[];
      for(let x of this.userStats){
        if(x.ID === value){
          this.statsInPage.push(x);
        }            
      }
      this.showCards=true;
    }
    else{
      this.showCards=false;
    }
  }

  getAllStats(){
    this.apiService.getStats(this.SESSION.user_id).subscribe(res=>{
      this.userStats=res.body;
    },err=>{
      this.toastService.showToast("An error occured","danger");
    })
  }

  getStatsName(){ 
    this.apiService.getStatsNameAndID(this.SESSION.user_id).subscribe(res=>{
      this.statsPageNames=res.body;
    },err=>{
       this.toastService.showToast("An error occured","danger");
    })
  }

  logOut(){ // CLEAR SESSION AND LOGOUT
    this.storage.SESSION_CLEAR();
    this.toastService.showToast("Logout is successful.","dark");
    setTimeout(()=>
      this.navController.navigateBack("/login")
    ,1000);
    
  }

  refreshAll(){
    this.getStatsName();
    this.getAllStats();
  }

  // MODALS OPERATIONS
  async showPrevious(home,away) {
    const modal = await this.modalController.create({
      component: PreviousModalPage,
      componentProps:{homeTeamName:home,awayTeamName:away}
    });

    modal.present(); //Show modal
  }
  async showAddStats(){
    const modal = await this.modalController.create({
      component: AddstatsModalPage,
      componentProps:{stats_id:this.selectedSegment}
    });
    modal.present();
  }
  async showNewStats(){
    const modal = await this.modalController.create({
      component: NewstatsModalPage
    });
    modal.present();
  }
}
