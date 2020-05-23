/**
 * Main entry point component for the voltage chart feature
 * Date: 22 May 20
 * @Modules:
 *   takeUntil: to take until observable is not unsubscribed
 *   Subject: for destroy purpose
 * @Input: 
 *   DataService (to get batteryData as observable)
 * @Output:
 *   Provide the batteryData to child component (app-linechart)
 *   Based on given data renders the d3 chart based on this data
 * @Angular-Practises used:
 *   destroy
 *   unsubscribe
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DataService } from './data.service';

@Component({
  templateUrl: 'voltage.component.html'
})

export class VoltageComponent implements OnInit, OnDestroy {
  // hold the battery related data
  public batteryData: any[]; 
  // for unsubscription purpose
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // get the battery related data from service
    this.dataService.sendBatteryData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        if(data.length > 0) {
          this.batteryData = data
        }
    });  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}