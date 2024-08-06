import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultContainerComponent } from './container/result-container.component';
import { ResultRoutingModule } from './result-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailComponent } from './components/job-detail/job-detail.component';


@NgModule({
    declarations: [ResultContainerComponent, JobDetailComponent],
    imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
