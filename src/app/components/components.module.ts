import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncremenadorComponent } from './incremenador/incremenador.component';
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [IncremenadorComponent, DonaComponent],
  exports: [
    IncremenadorComponent,
    DonaComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
