import { Component, OnInit, OnDestroy } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DataService } from './data.service';

@Component({
  templateUrl: 'voltage.component.html'
})

export class VoltageComponent implements OnInit, OnDestroy {
  public batteryData: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // get the battery data
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