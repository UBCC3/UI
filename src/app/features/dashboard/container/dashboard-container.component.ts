import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectUser } from '../../../store/selectors/user.selectors';
import { Observable } from 'rxjs';
// import * as moment from 'moment';
import moment from 'moment';

// const moment = require('moment');

const inProgress = [
    {
        id: '98ecc611-f384-490c-9f8a-3f5084110341',
        created: new Date(),
        userid: 'a.yang223@gmail.com',
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
        userid: 'a.yang223@gmail.com',
        job_name: 'test job name2',
        submitted: new Date(),
        started: new Date(),
        finished: null,
        status: 'stopped', // NOTE: stopped can mean paused or cancel, update db enum?
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'a.yang223@gmail.com',
        job_name: 'test job name3',
        submitted: new Date(),
        started: new Date(),
        finished: null,
        status: 'submitted', // NOTE: submitted mean server has the job but did not start so no in progress yet
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
    {
        id: '07010fe6-1591-44dc-b188-b04610320969',
        created: new Date(),
        userid: 'a.yang223@gmail.com',
        job_name: 'test job name3',
        submitted: new Date(),
        started: new Date(),
        finished: null,
        status: 'paused',
        parameters: {
            calculation: 'Natural Bond Orbitals',
        },
    },
];

const isCompleted = [
    {
        id: '98ecc611-f384-490c-9f8a-3f5084110341',
        created: new Date(),
        userid: 'a.yang223@gmail.com',
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
        userid: 'a.yang223@gmail.com',
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
        userid: 'a.yang223@gmail.com',
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
        userid: 'a.yang223@gmail.com',
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
        userid: 'a.yang223@gmail.com',
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
        userid: 'a.yang223@gmail.com',
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
        userid: 'a.yang223@gmail.com',
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

// CREATE TABLE JOBS (
//     ID UUID PRIMARY KEY,
//     CREATED TIMESTAMP DEFAULT NOW(),
//     USERID VARCHAR(255) NOT NULL,
//     JOB_NAME VARCHAR(255) NOT NULL,
//     SUBMITTED TIMESTAMP DEFAULT NULL,
//     STARTED TIMESTAMP DEFAULT NULL,
//     FINISHED TIMESTAMP DEFAULT NULL,
//     STATUS JOB_STATUS DEFAULT 'SUBMITTED',
//     PARAMETERS JSONB DEFAULT NULL,
//     FOREIGN KEY (USERID) REFERENCES USERS(EMAIL)
// );

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

    inProgress: any;
    isCompleted: any;

    show: string = 'All';
    page = 1;
    pageSize = 5;
    set isSelected(isSelected: boolean) {}

    constructor(public auth: AuthService, public http: HttpClient, public store: Store<AppState>) {
        this.inProgress = inProgress;
        this.isCompleted = isCompleted;
    }

    ngOnInit() {
        this.user$ = this.store.pipe(select(selectUser));
        this.auth.getAccessTokenSilently().subscribe((token) => console.log('token', token));
        this.getUserName();
    }

    newStructureClick(): void {
        console.log('new structure click');
    }

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

    getTimeDifference(start: Date, finished: Date) {
        const startTime = moment(start);
        const endTime = moment(finished);
        const duartionInMs = endTime.diff(startTime);
        return moment.duration(duartionInMs).humanize();
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

    selectJob(isSelected: boolean, jobName: string): void {
        console.log(isSelected, jobName);
    }

    selectAllJobs(event: any, page: number): void {
        console.log(event);

        for (let i = 5 * (page - 1); i < 5 * (page - 1) + 5; i++) {
            // get list
            if (i <= this.isCompleted.length - 1) {
                this.isCompleted[i].selected = event.target.checked;
            }
        }
    }

    handlePageChange(event: any): void {
        // TODO: change to server side render
        this.page = event;
    }

    get isSelected() {
        const itemIndex = 5 * (this.page - 1);
        const itemsInCurrentPage = this.isCompleted.slice(itemIndex, itemIndex + 5);
        const isSelected = itemsInCurrentPage.every((item: any) => item.selected);
        return isSelected;
    }
}
