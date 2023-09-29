import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../../../../shared/models/jobs.model';
import moment from 'moment';

@Component({
    selector: 'app-completed-jobs-table',
    templateUrl: './completed-jobs-table.component.html',
    styleUrls: ['./completed-jobs-table.component.scss'],
})
export class CompletedJobsTableComponent implements OnInit {
    @Input()
    completedJobs!: Job[] | null;
    @Input()
    completedJobsCount!: number | undefined;
    @Input()
    offset!: number;
    @Input()
    limit!: number;
    currentPage = 1;
    totalPages = 1;

    page = 1;
    pageSize = 5;

    selectedJobs: Job[];
    show: string;
    @Output()
    previousEvent: EventEmitter<any>;
    @Output()
    nextEvent: EventEmitter<any>;

    constructor() {
        this.selectedJobs = [];
        this.show = 'All';
        this.previousEvent = new EventEmitter();
        this.nextEvent = new EventEmitter();
    }

    ngOnInit(): void {
        this.getCurrentPage();
        this.getTotalPages();
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
            if (this.completedJobs)
                for (let i = 5 * (page - 1); i < 5 * (page - 1) + 5; i++) {
                    if (i <= this.completedJobs.length - 1) {
                        this.selectedJobs.push(this.completedJobs[i]);
                    }
                }
        } else {
            if (this.completedJobs)
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

    get isSelected(): boolean | undefined {
        const itemIndex = 5 * (this.currentPage - 1);
        const itemsInCurrentPage = this.completedJobs?.slice(itemIndex, itemIndex + 5);
        const isSelected = itemsInCurrentPage?.every((item: any) => this.selectedJobs?.includes(item));
        return isSelected;
    }

    onPreviousClick(): void {
        this.previousEvent.emit('previous click');
    }

    onNextClick(): void {
        this.nextEvent.emit('next click');
    }

    getCurrentPage(): number {
        this.currentPage = this.offset == 0 ? 1 : this.offset / this.limit + 1;
        return this.currentPage;
    }

    getTotalPages(): number {
        this.totalPages = this.completedJobsCount ? Math.ceil(this.completedJobsCount / this.limit) : 1;
        return this.totalPages;
    }
}
