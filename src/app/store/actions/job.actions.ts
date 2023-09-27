import { createAction, props } from '@ngrx/store';
import { Job } from '../../shared/models/jobs.model';

export const loadInProgressJobs = createAction('[Jobs] load inprogress jobs');

export const loadCompleteJobs = createAction('[Jobs] load complete jobs');

export const loadInProgressJobsSuccess = createAction('[Jobs] load in progress jobs success', props<{ jobs: Job[] }>());

export const loadInProgressJobsFail = createAction('[Jobs] load in progress jobs failed', props<{ error: string }>());

export const loadCompleteJobsSuccess = createAction('[Jobs] load complete jobs success', props<{ jobs: Job[] }>());

export const loadCompleteJobsFail = createAction('[Jobs] load complete jobs failed', props<{ error: string }>());
