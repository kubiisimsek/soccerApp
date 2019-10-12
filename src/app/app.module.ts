import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {ToastController} from '@ionic/angular';

// MODALS
import {SignupModalPageModule} from './modals/signup-modal/signup-modal.module';
import {PreviousModalPageModule} from './modals/previous-modal/previous-modal.module';
import {NewstatsModalPageModule} from './modals/newstats-modal/newstats-modal.module';
import {AddstatsModalPageModule} from './modals/addstats-modal/addstats-modal.module';  
// ANGULAR MATERIAL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule,
  MatCheckboxModule,
  } 
   from '@angular/material';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    SignupModalPageModule,
    PreviousModalPageModule,
    NewstatsModalPageModule,
    AddstatsModalPageModule,
    HttpClientModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ToastController
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
