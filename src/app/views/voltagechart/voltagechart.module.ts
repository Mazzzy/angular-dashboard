import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { VoltageChartComponent } from './voltagechart.component';
import { VoltageChartRoutingModule } from './voltagechart-routing.module';

@NgModule({
  imports: [
    FormsModule,
    VoltageChartRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ VoltageChartComponent ]
})
export class VoltageChartModule { }
