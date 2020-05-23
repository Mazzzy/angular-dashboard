import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as data from './data/batteryData.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private batteryData: any = (data as any).default;

  private dataSource = new BehaviorSubject<any>(this.batteryData);
  dataList = this.dataSource.asObservable();

  constructor() { }
  
  public sendBatteryData(){
    return this.dataList;
  }
}
