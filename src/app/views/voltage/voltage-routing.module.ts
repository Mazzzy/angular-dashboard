import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoltageComponent } from './voltage.component';

const routes: Routes = [
  {
    path: '',
    component: VoltageComponent,
    data: {
      title: 'Voltage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoltageRoutingModule {}
