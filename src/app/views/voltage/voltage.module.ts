/**
 * Custom module to demonstrate the line chart feature using d3 JS
 * Date: 22 May 20
 * @Input: 
 *   CommonModule - to use ngFor
 *   VoltageRoutingModule - for module specific routing (nesting)
 *   BsDropdownModule - for bootstrap dropdown usage
 * @Output:
 *   Plug and play module for charting feature
 */
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
