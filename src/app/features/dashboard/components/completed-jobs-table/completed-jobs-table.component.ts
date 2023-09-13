import { Component, Input } from '@angular/core';
import { Job } from '../../../../shared/models/jobs.model';
import moment from 'moment';

@Component({
    selector: 'app-completed-jobs-table',
    templateUrl: './completed-jobs-table.component.html',
    styleUrls: ['./completed-jobs-table.component.scss'],
})
export class CompletedJobsTableComponent {
    @Input()
    completedJobs!: Job[];

    page = 1;
    pageSize = 5;

    selectedJobs: Job[];
    show: string;

    constructor() {
        this.selectedJobs = [];
        this.show = 'All';
    }

    getTimeDifference(start: string | undefined, finished: string | undefined) {
        // jobs are completed so start and finished will never be null from db
        const startTime = moment(start);
        const endTime = moment(finished);
        const duartionInMs = endTime.diff(startTime);
        return moment.duration(duartionInMs).humanize();
    }

    selectAllJobs(event: any, page: number): void {
        const target = event.target as HTMLInputElement;

        if (target.checked) {
            for (let i = 5 * (page - 1); i < 5 * (page - 1) + 5; i++) {
                if (i <= this.completedJobs.length - 1) {
                    this.selectedJobs.push(this.completedJobs[i]);
                }
            }
        } else {
            for (let i = 5 * (page - 1); i < 5 * (page - 1) + 5; i++) {
                const index = this.selectedJobs?.indexOf(this.completedJobs[i]);
                if (index !== -1) {
                    this.selectedJobs.splice(index, 1);
                }
            }
        }
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

    isJobSelected(job: Job): boolean {
        return this.selectedJobs?.includes(job);
    }

    handleStatusMenuClick(type: string): void {
        // TODO: handle event
        // use shared service to make code less coupled
        console.log('handle event emitted by status menu', type);
    }

    onShowClick(index: number): void {
        switch (index) {
            case 0:
                this.show = 'All';
                // TODO: send action
                return;
            case 1:
                this.show = 'Completed';
                return;
            case 2:
                this.show = 'Failed';
                return;
            default:
                this.show = 'All';
                return;
        }
    }

    openJob(jobId: string): void {
        // TODO: service file to emit event
        console.log('open job', jobId);
    }

    handlePageChange(event: any): void {
        // TODO: change to server side render
        console.log('event', event);
        this.page = event;
    }

    get isSelected(): boolean {
        const itemIndex = 5 * (this.page - 1);
        const itemsInCurrentPage = this.completedJobs?.slice(itemIndex, itemIndex + 5);
        const isSelected = itemsInCurrentPage?.every((item: any) => this.selectedJobs?.includes(item));
        return isSelected;
    }
}
