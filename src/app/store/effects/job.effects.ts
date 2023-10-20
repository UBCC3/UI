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
    postNewJob,
    postNewJobFail,
    postNewJobSuccess,
} from '../actions/job.actions';
import { selectUserEmail } from '../selectors/user.selectors';
import { DashboardService } from '../../features/dashboard/dashboard.service';
import { NewCalculationService } from '../../features/new-calculation/new-calculation.service';
import { Router } from '@angular/router';

@Injectable()
export class JobEffects {
    loadInProgressJobs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInProgressJobs),
            withLatestFrom(this.store.select(selectUserEmail)),
            filter(([, email]) => !!email),
            mergeMap(([, email]) => {
                if (email) {
                    return this.dashboardService.getInProgressJobs$(email).pipe(
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
            mergeMap(([action, email]) => {
                const { limit, offset } = action;
                if (email) {
                    return this.dashboardService.getCompletedJobs$(email, limit, offset).pipe(
                        map((paginatedJobs) => {
                            return loadCompletedJobsSuccess({ paginatedJobs });
                        }),
                        catchError((error) => of(loadCompletedJobsFail({ error })))
                    );
                } else {
                    const error = { error: 'Email is required.' };
                    return of(loadCompletedJobsFail(error));
                }
            })
        )
    );

    createNewJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(postNewJob),
            mergeMap((action) =>
                this.newCalculationService.submitNewCalculation$(action.jobDetail).pipe(
                    map((job) => {
                        this.router.navigate(['/dashboard']);
                        return postNewJobSuccess({ job });
                    }),
                    catchError((error) => of(postNewJobFail({ error })))
                    // TODO: toast service to handle error
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private dashboardService: DashboardService,
        private newCalculationService: NewCalculationService,
        private router: Router
    ) {}
}
