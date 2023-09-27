import { Action, combineReducers, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Job } from '../../shared/models/jobs.model';
import { AppState } from '..';
import {
    loadCompleteJobsFail,
    loadCompleteJobsSuccess,
    loadInProgressJobsFail,
    loadInProgressJobsSuccess,
} from '../actions/job.actions';

export interface JobState {
    inProgressJobs: InProgressJobsEntityState;
    completeJobs: CompleteJobsEntityState;
}

export interface InProgressJobsEntityState extends EntityState<Job> {
    inProgressJobsAreLoading: boolean;
    inProgressJobsAreLoaded: boolean;
    error: string | null;
}

export const inProgressJobsAdapter: EntityAdapter<Job> = createEntityAdapter<Job>();

export interface CompleteJobsEntityState extends EntityState<Job> {
    completeJobsAreLoading: boolean;
    completeJobsAreLoaded: boolean;
    error: string | null;
}

export const completeJobsAdapter: EntityAdapter<Job> = createEntityAdapter<Job>();

export const initialInProgressJobsState: InProgressJobsEntityState = inProgressJobsAdapter.getInitialState({
    inProgressJobsAreLoading: false,
    inProgressJobsAreLoaded: false,
    error: null,
});

export const initialCompleteJobsState: CompleteJobsEntityState = completeJobsAdapter.getInitialState({
    completeJobsAreLoading: false,
    completeJobsAreLoaded: false,
    error: null,
});

export const selectJobState = createFeatureSelector<AppState, JobState>('job');

export const inProgressJobsReducer = createReducer<InProgressJobsEntityState>(
    initialInProgressJobsState,
    on(loadInProgressJobsSuccess, (state, { jobs }) => inProgressJobsAdapter.addMany(jobs, state)),
    on(loadInProgressJobsFail, (state, { error }) => {
        return {
            ...state,
            error,
        };
    })
);

export const completeJobsReducer = createReducer<CompleteJobsEntityState>(
    initialCompleteJobsState,
    on(loadCompleteJobsSuccess, (state, { jobs }) => completeJobsAdapter.addMany(jobs, state)),
    on(loadCompleteJobsFail, (state, { error }) => {
        return {
            ...state,
            error,
        };
    })
);

export const reducers = combineReducers({
    inProgressJobs: inProgressJobsReducer,
    completeJobs: completeJobsReducer,
});

export function jobReducer(state: JobState | undefined, action: Action): JobState {
    return reducers(state, action);
}
