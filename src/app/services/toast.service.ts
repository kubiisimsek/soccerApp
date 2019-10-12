import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast:ToastController,
  ) { }

  async showToast(msg:string,color:string) {
    const toast = await this.toast.create({
      message: msg,
      position:"bottom",
      duration:2000,
      showCloseButton:true,
      color:color
    });
    toast.present();
  }
}
