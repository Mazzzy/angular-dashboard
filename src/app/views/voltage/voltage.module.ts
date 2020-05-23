import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { VoltageComponent } from './voltage.component';
import { VoltageRoutingModule } from './voltage-routing.module';
import { LinechartComponent } from './linechart/linechart.component';

@NgModule({
  imports: [
    CommonModule,
    VoltageRoutingModule,
    BsDropdownModule
  ],
  declarations: [ VoltageComponent, LinechartComponent ]
})
export class VoltageModule { }
