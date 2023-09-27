import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobState, completeJobsAdapter, inProgressJobsAdapter, selectJobState } from '../reducers/job.reducers';

const { selectAll, selectEntities, selectIds } = inProgressJobsAdapter.getSelectors();

export const selectInProgressJobState = createSelector(selectJobState, (state: JobState) => state.inProgressJobs);

export const selectInProgressJobs = createSelector(selectInProgressJobState, selectAll);

export const selectInProgressJobsById = createSelector(selectInProgressJobState, selectEntities);

export const selectInProgressJobsId = createSelector(selectInProgressJobState, selectIds);
