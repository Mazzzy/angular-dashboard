import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { VoltageComponent } from './voltage.component';
import { VoltageRoutingModule } from './voltage-routing.module';
import { LinechartComponent } from './linechart/linechart.component';

@NgModule({
  imports: [
    FormsModule,
    VoltageRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ VoltageComponent, LinechartComponent ]
})
export class VoltageModule { }
