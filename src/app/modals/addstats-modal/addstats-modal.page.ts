import { Component, OnInit } from '@angular/core';
import {ModalController,NavParams} from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {StorageService} from '../../services/storage.service';
import {ToastService} from '../../services/toast.service';

import{stats_tbl} from '../../class/database';
@Component({
  selector: 'app-addstats-modal',
  templateUrl: './addstats-modal.page.html',
  styleUrls: ['./addstats-modal.page.scss'],
})
export class AddstatsModalPage implements OnInit {

  constructor(
    private navParams:NavParams,
    private modalController:ModalController,
    private apiService:ApiService,
    private toast:ToastService,
    private storage:StorageService
  ) { }
  ngOnInit() {
    this.STATS_ID=this.navParams.get('stats_id');
    this.getLeagues();
  }

  STATS_ID:any;
  // DROPDOWN VARIABLES
  selectLeague:string;
  selectHomeTeam:string;
  selectAwayTeam:string;
  selectType:string;

  // ARRAY FOR DROPDOWNS
  leagueNameList:[]=[]; // GET LEAGUE NAMES FROM API
  teamList:[]=[];

  // INPUT VARIABLES
  statsName:string;
  homeFH:number;
  homeSH:number;
  awayFH:number;
  awaySH:number;


  statsPOST=new stats_tbl();


  getLeagues(){
    // LEAGUE NAME FOR DROPDOWN AND DISTINCT ELEMENTS
    this.apiService.getEvents().subscribe(res=>{
      let events:any = Object.values(res.body.events);
      this.leagueNameList=events.map(item=>item.leagueName).filter((value, index, self) => self.indexOf(value) === index);

    })
  }

  getTeamOnLeague(){
    this.apiService.getEvents().subscribe(res=>{
      let events:any = Object.values(res.body.events);
      let temp:[]=events.filter(item=>item.leagueName===this.selectLeague).map(item=>item.homeTeamName);
      let temp2:[]=events.filter(item=>item.leagueName===this.selectLeague).map(item=>item.awayTeamName);
      for(let i of temp){
        this.teamList.push(i);
      }
      for(let i of temp2){
        this.teamList.push(i);
      }
    })
  }


  leagueChange(){
    this.getTeamOnLeague();
  }
  awayTeamChange(){
    if(this.selectAwayTeam==this.selectHomeTeam){
       this.selectAwayTeam=null;
    }
  }

  addStats(){
    if(this.selectHomeTeam && this.selectAwayTeam && this.selectType){
      this.statsPOST.user_id=this.STATS_ID; // We need to send stats_id instead of user_id. API set stats_id.
      this.statsPOST.stats_hometeam=this.selectHomeTeam;
      this.statsPOST.stats_awayteam=this.selectAwayTeam;
      this.statsPOST.stats_type=this.selectType;
      this.statsPOST.stats_hometeam_fh=this.homeFH;
      this.statsPOST.stats_hometeam_sh=this.homeSH;
      this.statsPOST.stats_awayteam_fh=this.awayFH;
      this.statsPOST.stats_awayteam_sh=this.awaySH;

      this.apiService.appendStats(this.statsPOST).subscribe(res=>{
         this.toast.showToast("Stats added successfully","success");
         setTimeout(()=>
              this.closeModal()
         ,1000);
         },err=>{
            this.toast.showToast("An error occured when add stats.","danger");
          })
    }
    else
      console.log("error");
  }


  closeModal(){   
    this.modalController.dismiss();
  }
}
