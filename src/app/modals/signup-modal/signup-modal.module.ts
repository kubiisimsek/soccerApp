import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupModalPage } from './signup-modal.page';

import {
   MatButtonModule,
   MatInputModule,
   MatFormFieldModule,
   MatCheckboxModule
  } from '@angular/material';
const routes: Routes = [
  {
    path: '',
    component: SignupModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
    

  ],
  declarations: [SignupModalPage]
})
export class SignupModalPageModule {}
