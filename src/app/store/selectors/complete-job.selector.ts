import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobState, completeJobsAdapter, inProgressJobsAdapter, selectJobState } from '../reducers/job.reducers';

const { selectAll, selectEntities, selectIds } = completeJobsAdapter.getSelectors();

export const selectCompleteJobState = createSelector(selectJobState, (state: JobState) => state.completeJobs);

export const selectCompleteJobs = createSelector(selectCompleteJobState, selectAll);

export const selectCompleteJobsById = createSelector(selectCompleteJobState, selectEntities);

export const selectCompleteJobsId = createSelector(selectCompleteJobState, selectIds);
