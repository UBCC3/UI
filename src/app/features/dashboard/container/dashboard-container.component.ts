import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectUser } from '../../../store/selectors/user.selectors';
import { Observable, combineLatest, map } from 'rxjs';
import { Router } from '@angular/router';
import { StatusMenuService } from '../../../shared/components/status-menu/status-menu.service';
import { loadCompletedJobs, loadInProgressJobs } from '../../../store/actions/job.actions';
import {
    selectInProgressJobs,
    selectInProgressJobsAreLoaded,
} from '../../../store/selectors/in-progress-job.selectors';
import { selectCompletedJobs, selectCompletedJobsAreLoaded } from '../../../store/selectors/complete-job.selector';
import { Job } from '../../../shared/models/jobs.model';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent implements OnInit {
    responseJson!: string;
    hasApiError = false;

    userName!: string | undefined;
    inProgressJobs!: Job[] | null;
    completedJobs!: Job[] | null;

    user$!: Observable<User | undefined>;

    dataIsLoaded$!: Observable<boolean>;

    show: string;

    constructor(
        public auth: AuthService,
        public http: HttpClient,
        public store: Store<AppState>,
        public router: Router,
        private statusMenuService: StatusMenuService
    ) {
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
        this.store.dispatch(loadCompletedJobs());

        this.dataIsLoaded$ = combineLatest([
            this.store.pipe(select(selectInProgressJobsAreLoaded)),
            this.store.pipe(select(selectCompletedJobsAreLoaded)),
        ]).pipe(
            map(([inProgressJobsAreLoaded, completeJobsAreLoaded]) => {
                return inProgressJobsAreLoaded && completeJobsAreLoaded;
            })
        );

        combineLatest([this.store.select(selectInProgressJobs), this.store.select(selectCompletedJobs)]).subscribe(
            ([inProgressJobs, completedJobs]) => {
                this.inProgressJobs = inProgressJobs;
                this.completedJobs = completedJobs;
            }
        );
    }

    startACalculationClick(): void {
        this.router.navigate(['new-calculation']);
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
