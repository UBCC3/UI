import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { NewCalculationComponent } from './container/new-calculation.component';
import { NewCalculationRoutingModule } from './new-calculation-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [NewCalculationComponent],
    imports: [CommonModule, NewCalculationRoutingModule, SharedModule, ReactiveFormsModule],
})
export class NewCalculationModule {}
