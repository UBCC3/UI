import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultContainerComponent } from './container/result-container.component';
import { ResultRoutingModule } from './result-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { DownloadZipComponent } from './components/download-zip/download-zip.component';

@NgModule({
    declarations: [ResultContainerComponent, JobDetailComponent, DownloadZipComponent],
    imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
