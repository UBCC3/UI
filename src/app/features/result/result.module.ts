import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { SharedModule } from '../../shared/shared.module';
import { ResultRoutingModule } from './result-routing.module';

@NgModule({
    declarations: [ResultComponent],
    imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
