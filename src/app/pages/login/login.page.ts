import { Component, OnInit } from '@angular/core';
import {ModalController,NavController} from '@ionic/angular';
import {SignupModalPage} from '../../modals/signup-modal/signup-modal.page';
import {ApiService} from '../../services/api.service';
import {ToastService} from '../../services/toast.service';
import{StorageService} from '../../services/storage.service';
import{user_tbl} from '../../class/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalController:ModalController,
    private api:ApiService,
    private toastService:ToastService,
    private storage:StorageService,
    private navController:NavController
  ) { }

  ngOnInit()  {

  }

  // Input Variables
  username:string="kubikubi";
  password:string="12345";
  user=new user_tbl();
  login(){

    if(this.username && this.password){
      this.api.login(this.username,this.password).subscribe(res=>{
        if(res){
          this.toastService.showToast("Login successful","success");
          this.user=res.body;
          this.storage.SESSION_START(this.user);
          // res.body is user informations.
          setTimeout(()=>
            this.navController.navigateForward('/home')
            ,1000);
           
        }
      },err=>{
        if(err.status==404){
          this.toastService.showToast("Invalid username or password","danger");
        }
        else if(err.status==400){
          this.toastService.showToast("An error occured when login","danger");
        }
      }
      )}
    else{
      this.toastService.showToast("Please check username and password","danger");
    }

  }

  signUp(){
    this.openModal();
  }

 

  async openModal() {
    const modal = await this.modalController.create({
      //Create modal and options
      component: SignupModalPage
    });

    modal.present(); //Show modal
  }
}
