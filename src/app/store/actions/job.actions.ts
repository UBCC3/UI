import { createAction, props } from '@ngrx/store';
import { Job, NewJobDTO, PaginatedJob, UpdateJobDTO } from '../../shared/models/jobs.model';
import { DisplayEnum } from '../../shared/models/display.enum';

export const loadInProgressJobs = createAction('[Jobs] load inprogress jobs');

export const loadCompletedJobs = createAction(
    '[Jobs] load completed jobs',
    props<{ limit: number; offset: number; display: DisplayEnum }>()
);

export const loadInProgressJobsSuccess = createAction('[Jobs] load in progress jobs success', props<{ jobs: Job[] }>());

export const loadInProgressJobsFail = createAction('[Jobs] load in progress jobs failed', props<{ error: string }>());

// export const loadCompletedJobsSuccess = createAction('[Jobs] load completed jobs success', props<{ jobs: Job[] }>());

export const loadCompletedJobsSuccess = createAction(
    '[Jobs] load completed jobs success',
    props<{ paginatedJobs: PaginatedJob }>()
);

export const loadCompletedJobsFail = createAction('[Jobs] load completed jobs failed', props<{ error: string }>());

export const setNewJobIsSubmitting = createAction('[Jobs] setting new job is submitting');

export const postNewJob = createAction('[Jobs] post new job', props<{ jobDetail: NewJobDTO }>());

export const postNewJobSuccess = createAction('[Jobs] post new job success', props<{ job: Job }>());

export const postNewJobFail = createAction('[Jobs] post new job fail', props<{ error: string }>());

export const deleteCompletedJob = createAction('[Jobs] delete completed job', props<{ jobId: string }>());

// NOTE: return id to call reduce fn on reducer?
export const deleteCompletedJobSuccess = createAction(
    '[Jobs] delete completed job success',
    props<{ jobId: string }>()
);

export const deleteCompletedJobFail = createAction('[Jobs] delete completed job fail', props<{ error: string }>());

export const updateJob = createAction('[Jobs] update in progress job', props<{ jobId: string; dto: UpdateJobDTO }>());

export const updateJobSuccess = createAction('[Jobs] update job success', props<{ jobId: string }>());

export const updateJobFail = createAction('[Jobs] update job fail', props<{ error: string }>());
