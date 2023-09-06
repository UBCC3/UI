import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../../../shared/models/jobs.model';

@Component({
    selector: 'app-in-progress-jobs-table',
    templateUrl: './in-progress-jobs-table.component.html',
    styleUrls: ['./in-progress-jobs-table.component.scss'],
})
export class InProgressJobsTableComponent implements OnInit {
    @Input()
    inProgressJobs!: Job[];

    page = 1;
    pageSize = 5;

    selectedJobs: Job[];

    constructor() {
        this.selectedJobs = [];
    }

    ngOnInit(): void {}

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

    handleStatusMenuClick(type: string): void {
        // TODO: handle event
        // use shared service to make code less coupled
        console.log('handle event emitted by status menu', type);
    }

    isSelected(job: Job): boolean {
        return this.selectedJobs?.includes(job);
    }
}
