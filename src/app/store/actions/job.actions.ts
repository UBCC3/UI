import { createAction, props } from '@ngrx/store';
import { Job } from '../../shared/models/jobs.model';

export const loadInProgressJobs = createAction('[Jobs] load inprogress jobs');

export const loadCompletedJobs = createAction('[Jobs] load completed jobs');

export const loadInProgressJobsSuccess = createAction('[Jobs] load in progress jobs success', props<{ jobs: Job[] }>());

export const loadInProgressJobsFail = createAction('[Jobs] load in progress jobs failed', props<{ error: string }>());

export const loadCompletedJobsSuccess = createAction('[Jobs] load completed jobs success', props<{ jobs: Job[] }>());

export const loadCompletedJobsFail = createAction('[Jobs] load completed jobs failed', props<{ error: string }>());
