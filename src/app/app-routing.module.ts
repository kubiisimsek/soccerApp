import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  //{ path: 'signup-modal', loadChildren: './modals/signup-modal/signup-modal.module#SignupModalPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  //{ path: 'addstats-modal', loadChildren: './modals/addstats-modal/addstats-modal.module#AddstatsModalPageModule' },
  //{ path: 'previous-modal', loadChildren: './modals/previous-modal/previous-modal.module#PreviousModalPageModule' },
  //{ path: 'newstats-modal', loadChildren: './modals/newstats-modal/newstats-modal.module#NewstatsModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
