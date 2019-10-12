import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {user_tbl} from '../../class/database';
import {ApiService} from '../../services/api.service';
import {ToastService} from '../../services/toast.service';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.page.html',
  styleUrls: ['./signup-modal.page.scss'],
})
export class SignupModalPage implements OnInit {

  constructor(
    private modalController:ModalController,
    private api:ApiService,
    private toastService:ToastService
  ) { }

  ngOnInit() {
  }


  // Input variables
  passwordAgain:string;
  isChecked:boolean;
  userInfo:user_tbl=new user_tbl();
  register(){
    if(this.userInfo && this.passwordAgain && this.isChecked){
      if(this.userInfo.user_password === this.passwordAgain){
        this.api.register(this.userInfo).subscribe(res=>{
            this.toastService.showToast("Register is successful!","success");
            setTimeout(function(){
              this.closeModal();
            },500);            
        },err=>{
          if(err.status==405){
            this.toastService.showToast("This email already registered","danger");
          }
          else if(err.status==503){
            this.toastService.showToast("An error occured","danger");
          }
          else if(err.status==400){
            this.toastService.showToast("An error occured.Please try again later","danger");
          }
        });
      }
      else{
        this.toastService.showToast("Please check your passwords","danger");
      }
    }
    else{
      this.toastService.showToast("Please check your information","danger");
    }
  }
  closeModal(){
    this.modalController.dismiss();
  }

}
