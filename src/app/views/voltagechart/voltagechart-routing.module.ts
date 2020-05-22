import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoltageChartComponent } from './voltagechart.component';

const routes: Routes = [
  {
    path: '',
    component: VoltageChartComponent,
    data: {
      title: 'VoltageChart'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoltageChartRoutingModule {}
