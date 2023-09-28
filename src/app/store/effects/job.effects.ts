import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
    loadCompletedJobs,
    loadCompletedJobsFail,
    loadCompletedJobsSuccess,
    loadInProgressJobs,
    loadInProgressJobsFail,
    loadInProgressJobsSuccess,
} from '../actions/job.actions';
import { selectUserEmail } from '../selectors/user.selectors';
import { DashboardService } from '../../features/dashboard/dashboard.service';

@Injectable()
export class JobEffects {
    loadInProgressJobs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInProgressJobs),
            withLatestFrom(this.store.select(selectUserEmail)),
            filter(([, email]) => !!email),
            mergeMap(([, email]) => {
                if (email) {
                    return this.dashboardService.getInProgressJobs(email).pipe(
                        map((jobs) => loadInProgressJobsSuccess({ jobs })),
                        catchError((error) => of(loadInProgressJobsFail({ error })))
                    );
                } else {
                    const error = { error: 'Email is required.' };
                    return of(loadInProgressJobsFail(error));
                }
            })
        )
    );

    loadCompletedJobs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCompletedJobs),
            withLatestFrom(this.store.select(selectUserEmail)),
            filter(([, email]) => !!email),
            mergeMap(([, email]) => {
                if (email) {
                    return this.dashboardService.getCompletedJobs(email).pipe(
                        map((jobs) => loadCompletedJobsSuccess({ jobs })),
                        catchError((error) => of(loadCompletedJobsFail({ error })))
                    );
                } else {
                    const error = { error: 'Email is required.' };
                    return of(loadCompletedJobsFail(error));
                }
            })
        )
    );

    constructor(private actions$: Actions, private store: Store, private dashboardService: DashboardService) {}
}
