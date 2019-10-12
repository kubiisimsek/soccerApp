import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {user_tbl} from '../class/database';

const KEY="SESSION";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) {}


  SESSION_START(item: user_tbl): Promise<any> {
    return this.storage.set(KEY, [item]);
  }

  GET_SESSION(): Promise<user_tbl> {
    return this.storage.get(KEY);
  }

  SESSION_CLEAR() {
    this.storage.clear();
  }
}
