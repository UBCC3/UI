import { createSelector } from '@ngrx/store';
import { JobState, selectJobState } from '../reducers/job.reducers';

export const selectCompletedJobState = createSelector(selectJobState, (state: JobState) => state.completedJobs);

export const selectCompletedJobs = createSelector(selectCompletedJobState, (state) => state?.paginatedJobs?.data);

export const selectCompletedJobsCount = createSelector(
    selectCompletedJobState,
    (state) => state?.paginatedJobs?.total_count
);

export const selectCompletedJobsAreLoaded = createSelector(
    selectCompletedJobState,
    (state) => state?.completedJobsAreLoaded
);

export const selectCompletedJobsAreLoading = createSelector(
    selectCompletedJobState,
    (state) => state?.completedJobsAreLoading
);
