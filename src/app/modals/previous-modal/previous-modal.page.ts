import { Component, OnInit } from '@angular/core';
import {ModalController,NavParams} from '@ionic/angular';

import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-previous-modal',
  templateUrl: './previous-modal.page.html',
  styleUrls: ['./previous-modal.page.scss'],
})
export class PreviousModalPage implements OnInit {

  constructor(
    private modalController:ModalController,
    private navParams:NavParams,
    private api:ApiService
  ) { }

  ngOnInit() {
    this.homeTeam=this.navParams.get('homeTeamName');
    this.awayTeam=this.navParams.get('awayTeamName');
    this.selectedTeam=this.homeTeam;
    this.getPreviousMatches();

  }

  // SAVE HOME AND AWAY TEAM PREVIOUS MATCHES IN A OBJECT
  homePreviousMatches:Object;
  awayPreviousMatches:Object;


  homeTeam:string=""; // HOMETEAM VARIABLE
  awayTeam:string=""; // AWAYTEAM VARIABLE
  showSelected:object; // SHOW SELECTED TEAM INFORMATION

  isHome:boolean;  // TEAM IS AWAY OR HOME

  selectedCardMenu:string=""; // SEASON - HOME - AWAY SEGMENT VALUE
  selectedTeam:string=""; // HOME TEAM - AWAY TEAM SEGMENT VALUE


  getPreviousMatches(){
    var homeTRchar=this.TRtoEN(this.homeTeam);
    this.api.getFixture(homeTRchar).subscribe( items =>{
      this.homePreviousMatches=items;
    });

    var awayTRchar=this.TRtoEN(this.awayTeam);
    this.api.getFixture(awayTRchar).subscribe( items =>{
      this.awayPreviousMatches=items;
    });
  }

  // Home Team - Away Team segment change
  topBarChange(ev:any){
    this.selectedTeam=ev.detail.value;
  }

  // Season - Home - Away segment change
  cardBarChange(ev:any){
    this.selectedCardMenu=ev.detail.value;
    this.showSelected=null;
    if(this.selectedTeam==this.homeTeam){
      if(ev.detail.value=="Season"){
        this.showSelected=this.homePreviousMatches["body"];
      }
      else if(ev.detail.value=="Home"){
        this.isHome=true;
        this.showSelected=this.homePreviousMatches["body"].map(item=>item).filter(item=>item.homeTeamName===this.homeTeam);
      }
      else if(ev.detail.value=="Away"){
        this.isHome=false;
        this.showSelected=this.homePreviousMatches["body"].map(item=>item).filter(item=>item.awayTeamName===this.homeTeam);
      }
    }
    else{
      if(ev.detail.value=="Season"){
        this.showSelected=this.awayPreviousMatches["body"];
      }
      else if(ev.detail.value=="Home"){
        this.isHome=true;
        this.showSelected=this.awayPreviousMatches["body"].map(item=>item).filter(item=>item.homeTeamName===this.awayTeam);
      }
      else if(ev.detail.value=="Away"){
        this.isHome=false;
        this.showSelected=this.awayPreviousMatches["body"].map(item=>item).filter(item=>item.awayTeamName===this.awayTeam);
      }
    }

  }


  closeModal(){ // CLOSE MODAL FUNCTION
    this.modalController.dismiss();
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
