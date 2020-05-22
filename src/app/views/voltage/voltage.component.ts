import { Component, OnInit, OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DataService } from './data.service';

@Component({
  templateUrl: 'voltage.component.html'
})
export class VoltageComponent implements OnInit, OnDestroy {

  radioModel: string = 'Month';
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService) { }

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  ngOnInit(): void {
    // get the chart data
    this.dataService.sendChartData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        if(data) {
          console.log('Chart data', data);
          this.lineChart1Data[0]["data"] = data
        }
    });  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
    console.log('Chart data Unsubscribed')
  }
}