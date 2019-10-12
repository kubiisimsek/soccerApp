import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {user_tbl,stats_tbl} from '../class/database';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) { }

  URL:string="http://iddaa.kubisimsek.com/";
  loginGET:string="login";
  registerPOST:string="register.php";
  eventsGET:string="iddaa.php";
  statsPOST:string="stats.php";
  statsGET:string="stats/user/";
  statsPOST2:string="addstats.php";
  statsNameGET:string="stats/userstats/";
  
  fixtureGET:string="fixture/";
  
  // LOGIN & REGISTER 
  login(email,pass):Observable<any>{
    return this.http.get(this.URL+this.loginGET+"/"+email+"/"+pass,{observe:'response'});
  }
  register(user:user_tbl):Observable<user_tbl>{
    return this.http.post<user_tbl>(this.URL+this.registerPOST,JSON.stringify(user),{observe:"body"});
  }

  
  // STATS
  addStats(statistic:stats_tbl):Observable<stats_tbl>{
    return this.http.post<stats_tbl>(this.URL+this.statsPOST,JSON.stringify(statistic),{observe:"body"});
  }
  appendStats(statistic:stats_tbl):Observable<stats_tbl>{
    return this.http.post<stats_tbl>(this.URL+this.statsPOST2,JSON.stringify(statistic),{observe:"body"});
  }
  getStats(user_id):Observable<any>{
    return this.http.get(this.URL+this.statsGET+user_id,{observe:'response'});
  }
  getStatsNameAndID(user_id):Observable<any>{
    return this.http.get(this.URL+this.statsNameGET+user_id,{observe:'response'});
  }


  // MATCHES
  getEvents():Observable<any>{
    return this.http.get(this.URL+this.eventsGET,{observe:'response'});
  }
  getFixture(teamName:string):Observable<any>{
    return  this.http.get(this.URL+this.fixtureGET+teamName,{observe:'response'});
  }
}
