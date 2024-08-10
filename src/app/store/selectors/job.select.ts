import { createSelector } from '@ngrx/store';
import { JobState, selectJobState } from '../reducers/job.reducers';

export const selectJobDetailState = createSelector(selectJobState, (state: JobState) => state.jobDetail);

export const selectJobDetail = createSelector(selectJobDetailState, (state) => state?.jobDetail);

export const selectJobDetailAreLoaded = createSelector(selectJobDetailState, (state) => state?.jobDetailAreLoaded);

export const selectJobDetailAreLoading = createSelector(selectJobDetailState, (state) => state?.jobDetailAreLoading);
