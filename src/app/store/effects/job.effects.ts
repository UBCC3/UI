import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
    deleteCompletedJob,
    deleteCompletedJobFail,
    loadCompletedJobs,
    loadCompletedJobsFail,
    loadCompletedJobsSuccess,
    loadInProgressJobs,
    loadInProgressJobsFail,
    loadInProgressJobsSuccess,
    postNewJob,
    postNewJobFail,
    postNewJobSuccess,
    updateJob,
    updateJobFail,
    loadJobById,
    loadJobByIdSuccess,
    loadJobByIdFail,
} from '../actions/job.actions';
import { selectUserEmail } from '../selectors/user.selectors';
import { DashboardService } from '../../features/dashboard/dashboard.service';
import { ResultService } from '../../features/result/result.sevice';
import { NewCalculationService } from '../../features/new-calculation/new-calculation.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { ToastType } from '../../shared/models/toast-type.enum';
import { DisplayEnum } from '../../shared/models/display.enum';

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
                    this.toastService.toast({
                        type: ToastType.Error,
                    });
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
                const { limit, offset, display } = action;
                if (email) {
                    return this.dashboardService.getCompletedJobs$(email, limit, offset, display).pipe(
                        map((paginatedJobs) => {
                            return loadCompletedJobsSuccess({ paginatedJobs });
                        }),
                        catchError((error) => of(loadCompletedJobsFail({ error })))
                    );
                } else {
                    const error = { error: 'Email is required.' };
                    this.toastService.toast({
                        type: ToastType.Error,
                    });
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
                    catchError((error) => {
                        this.toastService.toast({
                            type: ToastType.Error,
                        });
                        return of(postNewJobFail({ error }));
                    })
                )
            )
        )
    );

    deleteCompletedJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCompletedJob),
            switchMap((action) =>
                this.newCalculationService.deleteCompletedJob$(action.jobId).pipe(
                    switchMap((res) => {
                        if (res) {
                            return [
                                loadCompletedJobs({
                                    limit: 5,
                                    offset: 0,
                                    display: DisplayEnum.All,
                                }),
                            ];
                        } else {
                            this.toastService.toast({
                                type: ToastType.Error,
                            });
                            return of(deleteCompletedJobFail({ error: 'Failed to delete job' }));
                        }
                    }),
                    catchError((error) => {
                        this.toastService.toast({
                            type: ToastType.Error,
                        });
                        return of(deleteCompletedJobFail({ error }));
                    })
                )
            )
        )
    );

    updateJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateJob),
            switchMap((action) =>
                this.newCalculationService.cancelJob$(action.jobId).pipe(
                    switchMap((res) => {
                        if (res) {
                            return [
                                loadCompletedJobs({
                                    limit: 5,
                                    offset: 0,
                                    display: DisplayEnum.All,
                                }),
                                loadInProgressJobs(),
                            ];
                        } else {
                            this.toastService.toast({
                                type: ToastType.Error,
                            });
                            return of(updateJobFail({ error: 'Failed to update job' }));
                        }
                    }),
                    catchError((error) => {
                        this.toastService.toast({
                            type: ToastType.Error,
                        });
                        return of(updateJobFail({ error }));
                    })
                )
            )
        )
    );

    loadJobById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadJobById),
            mergeMap((action) =>
                this.resultService.getJobById$(action.jobId).pipe(
                    map((job) => {
                        return loadJobByIdSuccess({ job });
                    }),
                    catchError((error) => {
                        this.toastService.toast({
                            type: ToastType.Error,
                        });
                        return of(loadJobByIdFail({ error }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private dashboardService: DashboardService,
        private resultService: ResultService,
        private newCalculationService: NewCalculationService,
        private router: Router,
        private toastService: ToastService
    ) {}
}
