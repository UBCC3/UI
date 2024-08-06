import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../../../shared/models/jobs.model';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
    @Input() job$: Observable<Job | null> | null = null;

    job: Job | null = null;
    parameterEntries: { key: string; value: string }[] = [];

    ngOnInit(): void {
        if (this.job$) {
            this.job$.subscribe((job) => {
                this.job = job;
                if (job) {
                    this.parameterEntries = Object.entries(job.parameters || {})
                        .filter(([key, value]) => value !== null && value !== undefined)
                        .map(([key, value]) => ({ key, value: value as string }));
                }
            });
        }
    }
}
