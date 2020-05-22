import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import chartData from './data/chart-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private chartSource = new BehaviorSubject<any>(chartData);
  chartDataList = this.chartSource.asObservable();

  constructor() { }
  
  public sendChartData(){
    return this.chartDataList;
  }
}
