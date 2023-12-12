import { Component, Input } from '@angular/core';
import { Job, JobStatus } from '../../../../shared/models/jobs.model';
import { AppState } from '../../../../store';
import { Store } from '@ngrx/store';
import { updateJob } from '../../../../store/actions/job.actions';

@Component({
    selector: 'app-in-progress-jobs-table',
    templateUrl: './in-progress-jobs-table.component.html',
    styleUrls: ['./in-progress-jobs-table.component.scss'],
})
export class InProgressJobsTableComponent {
    @Input()
    inProgressJobs!: Job[] | null;

    selectedJobs: Job[];

    constructor(public store: Store<AppState>) {
        this.selectedJobs = [];
    }

    toggleSelection(job: Job, event: Event): void {
        const target = event.target as HTMLInputElement;

        if (target.checked) {
            this.selectedJobs.push(job);
        } else {
            const index = this.selectedJobs?.indexOf(job);
            if (index !== -1) {
                this.selectedJobs.splice(index, 1);
            }
        }
    }

    handleStatusMenuClick(type: string, job: Job): void {
        // Only cancel CTA from in-progress
        this.store.dispatch(updateJob({ jobId: job.id, dto: { status: JobStatus.CANCELLED } }));
    }

    isSelected(job: Job): boolean {
        return this.selectedJobs?.includes(job);
    }
}
