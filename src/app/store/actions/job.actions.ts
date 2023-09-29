import { createAction, props } from '@ngrx/store';
import { Job, PaginatedJob } from '../../shared/models/jobs.model';

export const loadInProgressJobs = createAction('[Jobs] load inprogress jobs');

export const loadCompletedJobs = createAction('[Jobs] load completed jobs', props<{ limit: number; offset: number }>());

export const loadInProgressJobsSuccess = createAction('[Jobs] load in progress jobs success', props<{ jobs: Job[] }>());

export const loadInProgressJobsFail = createAction('[Jobs] load in progress jobs failed', props<{ error: string }>());

// export const loadCompletedJobsSuccess = createAction('[Jobs] load completed jobs success', props<{ jobs: Job[] }>());

export const loadCompletedJobsSuccess = createAction(
    '[Jobs] load completed jobs success',
    props<{ paginatedJobs: PaginatedJob }>()
);

export const loadCompletedJobsFail = createAction('[Jobs] load completed jobs failed', props<{ error: string }>());
