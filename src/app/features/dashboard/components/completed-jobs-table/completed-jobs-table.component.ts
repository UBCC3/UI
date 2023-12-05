import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../../../../shared/models/jobs.model';
import moment from 'moment';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store';
import { selectCompletedJobsAreLoading } from '../../../../store/selectors/complete-job.selector';
import { DisplayEnum } from '../../../../shared/models/display.enum';
import { deleteCompletedJob, loadCompletedJobs } from '../../../../store/actions/job.actions';

@Component({
    selector: 'app-completed-jobs-table',
    templateUrl: './completed-jobs-table.component.html',
    styleUrls: ['./completed-jobs-table.component.scss'],
})
export class CompletedJobsTableComponent implements OnInit {
    @Input()
    completedJobs!: Job[] | null | undefined;
    @Input()
    completedJobsCount!: number | undefined;
    @Input()
    offset!: number;
    @Input()
    limit!: number;
    @Input()
    display!: DisplayEnum;

    currentPage = 1;
    totalPages = 1;

    page = 1;
    pageSize = 5;

    selectedJobs: Job[];

    @Output()
    previousEvent: EventEmitter<boolean>;
    @Output()
    nextEvent: EventEmitter<boolean>;
    @Output()
    filterEvent: EventEmitter<any>;

    dataIsLoading$!: Observable<boolean>;

    constructor(public store: Store<AppState>) {
        this.selectedJobs = [];
        this.previousEvent = new EventEmitter();
        this.nextEvent = new EventEmitter();
        this.filterEvent = new EventEmitter();
    }

    ngOnInit(): void {
        this.dataIsLoading$ = this.store.pipe(select(selectCompletedJobsAreLoading));
    }

    getTimeDifference(start: string | undefined, finished: string | undefined) {
        // jobs are completed so start and finished will never be null from db
        const startTime = moment(start);
        const endTime = moment(finished);
        const duartionInMs = endTime.diff(startTime);
        return moment.duration(duartionInMs).humanize();
    }

    // NOTE: currently disabled
    // selectAllJobs(event: any, page: number): void {
    //     const target = event.target as HTMLInputElement;

    //     if (target.checked) {
    //         if (this.completedJobs)
    //             for (let i = 5 * (page - 1); i < 5 * (page - 1) + 5; i++) {
    //                 if (i <= this.completedJobs.length - 1) {
    //                     this.selectedJobs.push(this.completedJobs[i]);
    //                 }
    //             }
    //     } else {
    //         if (this.completedJobs)
    //             for (let i = 5 * (page - 1); i < 5 * (page - 1) + 5; i++) {
    //                 const index = this.selectedJobs?.indexOf(this.completedJobs[i]);
    //                 if (index !== -1) {
    //                     this.selectedJobs.splice(index, 1);
    //                 }
    //             }
    //     }
    // }

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

    handleStatusMenuClick(type: string, job: Job): void {
        switch (type) {
            case 'delete':
                this.store.dispatch(deleteCompletedJob({ jobId: job.id }));
                break;
            case 'download':
                console.log('download');
                break;
        }
    }

    onShowClick(index: number): void {
        let display: DisplayEnum;
        switch (index) {
            case 1:
                display = DisplayEnum.Completed;
                break;
            case 2:
                display = DisplayEnum.Failed;
                break;
            case 3:
                display = DisplayEnum.Cancelled;
                break;
            default:
                display = DisplayEnum.All;
                break;
        }
        this.display = display;
        this.filterEvent.emit(display);
        this.store.dispatch(loadCompletedJobs({ limit: this.limit, offset: 0, display }));
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
        --this.currentPage;
        this.previousEvent.emit(true);
    }
    isPreviousButtonIsDisabled(): boolean {
        return this.currentPage === 1;
    }

    onNextClick(): void {
        ++this.currentPage;
        this.nextEvent.emit(true);
    }

    isNextButtonIsDisabled(): boolean {
        return this.currentPage == this.totalPages;
    }

    getTotalPages(): number {
        this.totalPages = this.completedJobsCount ? Math.ceil(this.completedJobsCount / this.limit) : 1;
        return this.totalPages;
    }
}
