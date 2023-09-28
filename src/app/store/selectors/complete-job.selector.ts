import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobState, completedJobsAdapter, inProgressJobsAdapter, selectJobState } from '../reducers/job.reducers';

const { selectAll, selectEntities, selectIds } = completedJobsAdapter.getSelectors();

export const selectCompletedJobState = createSelector(selectJobState, (state: JobState) => state.completedJobs);

export const selectCompletedJobs = createSelector(selectCompletedJobState, selectAll);

export const selectCompletedJobsById = createSelector(selectCompletedJobState, selectEntities);

export const selectCompletedJobsId = createSelector(selectCompletedJobState, selectIds);

export const selectCompletedJobsAreLoaded = createSelector(
    selectCompletedJobState,
    (state) => state?.completedJobsAreLoaded
);

export const selectCompletedJobsAreLoading = createSelector(
    selectCompletedJobState,
    (state) => state?.completedJobsAreLoading
);
