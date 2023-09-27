import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectUser } from '../../../store/selectors/user.selectors';
import { Observable, combineLatest } from 'rxjs';
import moment from 'moment';
import { Router } from '@angular/router';
import { StatusMenuService } from '../../../shared/components/status-menu/status-menu.service';
import { loadCompleteJobs, loadInProgressJobs } from '../../../store/actions/job.actions';
import {
    selectInProgressJobsId,
    selectInProgressJobs,
    selectInProgressJobsById,
} from '../../../store/selectors/in-progress-job.selectors';
import {
    selectCompleteJobs,
    selectCompleteJobsById,
    selectCompleteJobsId,
} from '../../../store/selectors/complete-job.selector';

const inProgress = [
    {
        id: '98ecc611-f384-490c-9f8a-3f5084110341',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name',
        submitted: '2023-08-01 19:58:27.094',
        started: '2023-08-01 19:58:27.094',
        finished: null,
        status: 'running',
        parameters: {
            calculation: 'Geometry Optimization',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name3',
        submitted: new Date(),
        started: new Date(),
        finished: null,
        status: 'submitted',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
];

const isCompleted = [
    {
        id: '98ecc611-f384-490c-9f8a-3f5084110341',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name',
        submitted: new Date(),
        started: '2023-08-01 19:58:27.094',
        finished: '2023-08-01 20:58:27.094',
        status: 'completed',
        parameters: {
            calculation: 'Geometry Optimization',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name2',
        submitted: new Date(),
        started: '2023-08-01 19:58:27.094',
        finished: '2023-08-02 09:58:27.094',
        status: 'completed',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name3',
        submitted: new Date(),
        started: '2023-08-01 19:58:27.094',
        finished: '2023-08-01 21:58:27.094',
        status: 'failed',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name3',
        submitted: new Date(),
        started: '2023-07-01 19:58:27.094',
        finished: '2023-07-016 19:58:27.094',
        status: 'cancelled',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name4',
        submitted: new Date(),
        started: '2023-07-01 19:58:27.094',
        finished: '2023-07-016 19:58:27.094',
        status: 'cancelled',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name5',
        submitted: new Date(),
        started: '2023-07-01 19:58:27.094',
        finished: '2023-07-016 19:58:27.094',
        status: 'cancelled',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'email@gmail.com',
        job_name: 'test job name6',
        submitted: new Date(),
        started: '2023-07-01 19:58:27.094',
        finished: '2023-07-016 19:58:27.094',
        status: 'cancelled',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
];

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent implements OnInit {
    responseJson!: string;
    hasApiError = false;

    userName!: string | undefined;

    user$!: Observable<User | undefined>;

    // for test data
    inProgress: any;
    isCompleted: any;

    show: string;

    constructor(
        public auth: AuthService,
        public http: HttpClient,
        public store: Store<AppState>,
        public router: Router,
        private statusMenuService: StatusMenuService
    ) {
        this.inProgress = inProgress;
        this.isCompleted = isCompleted;
        this.show = 'All';
    }

    ngOnInit() {
        this.user$ = this.store.pipe(select(selectUser));
        this.auth.getAccessTokenSilently().subscribe((token) => console.log('token', token));
        this.getUserName();
        // NOTE: subscriber to handle dropdown menu clicks
        this.statusMenuService.getStatusMenuEvent().subscribe((data: any) => {
            this.handleEmitterService(data);
        });

        this.store.dispatch(loadInProgressJobs());
        this.store.dispatch(loadCompleteJobs());

        combineLatest([
            this.store.select(selectInProgressJobsId),
            this.store.select(selectInProgressJobs),
            this.store.select(selectInProgressJobsById),
        ]).subscribe(([jobid, jobs, jobsbyid]) => {
            console.log('jobid', jobid);
            console.log('jobs', jobs);
            console.log('jobsbyid', jobsbyid);
        });

        combineLatest([
            this.store.select(selectCompleteJobsId),
            this.store.select(selectCompleteJobs),
            this.store.select(selectCompleteJobsById),
        ]).subscribe(([jobid, jobs, jobsbyid]) => {
            console.log('cjobid', jobid);
            console.log('cjobs', jobs);
            console.log('cjobsbyid', jobsbyid);
        });
    }

    startACalculationClick(): void {
        this.router.navigate(['new-calculation']);
    }

    // NOTE: delete after
    testApi() {
        this.http.get('http://localhost:8000/api/private').subscribe({
            next: (res) => {
                this.hasApiError = false;
                this.responseJson = JSON.stringify(res, null, 2).trim();
                console.log('res', this.responseJson);
            },
            error: () => (this.hasApiError = true),
        });
    }

    // NOTE: delete after
    testPost() {
        this.http
            .post('http://localhost:8000/api/private', { name: 'test name', content: 'some text for content' })
            .subscribe({
                next: (res) => {
                    this.hasApiError = false;
                    this.responseJson = JSON.stringify(res, null, 2).trim();
                    console.log('res', this.responseJson);
                },
                error: () => (this.hasApiError = true),
            });
    }

    getUserName(): void {
        this.user$.subscribe((res) => {
            this.userName = res?.given_name ? res.given_name : res?.email;
        });
    }

    handleEmitterService(data: any): void {
        console.log('event from status menu handled');
    }
}
