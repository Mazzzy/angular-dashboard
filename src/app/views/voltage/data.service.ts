/**
 * Data Service for the chart feature
 * Date: 23 May 20
 * @Modules:
 *   BehaviorSubject: to make json stream as observable
 * @Input: 
 *   JSON Data (from batteryData.json file)
 * @Output:
 *   dataList
 * @Angular-Practises used:
 *   For Offline JSON file usage - Added typing file : json-typings.d.ts file in the src/app folder
 */
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
  
  // to send dataList
  public sendBatteryData(){
    return this.dataList;
  }
}
