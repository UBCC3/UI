import { Action, combineReducers, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Job } from '../../shared/models/jobs.model';
import { AppState } from '..';
import {
    loadCompletedJobs,
    loadCompletedJobsFail,
    loadCompletedJobsSuccess,
    loadInProgressJobs,
    loadInProgressJobsFail,
    loadInProgressJobsSuccess,
} from '../actions/job.actions';

export interface JobState {
    inProgressJobs: InProgressJobsEntityState;
    completedJobs: CompletedJobsEntityState;
}

export interface InProgressJobsEntityState extends EntityState<Job> {
    inProgressJobsAreLoading: boolean;
    inProgressJobsAreLoaded: boolean;
    error: string | null;
}

export const inProgressJobsAdapter: EntityAdapter<Job> = createEntityAdapter<Job>();

export interface CompletedJobsEntityState extends EntityState<Job> {
    completedJobsAreLoading: boolean;
    completedJobsAreLoaded: boolean;
    error: string | null;
}

export const completedJobsAdapter: EntityAdapter<Job> = createEntityAdapter<Job>();

export const initialInProgressJobsState: InProgressJobsEntityState = inProgressJobsAdapter.getInitialState({
    inProgressJobsAreLoading: false,
    inProgressJobsAreLoaded: false,
    error: null,
});

export const initialCompletedJobsState: CompletedJobsEntityState = completedJobsAdapter.getInitialState({
    completedJobsAreLoading: false,
    completedJobsAreLoaded: false,
    error: null,
});

export const selectJobState = createFeatureSelector<AppState, JobState>('job');

export const inProgressJobsReducer = createReducer<InProgressJobsEntityState>(
    initialInProgressJobsState,
    on(loadInProgressJobs, (state) => {
        return {
            ...state,
            inProgressJobsAreLoading: true,
        };
    }),
    on(loadInProgressJobsSuccess, (state, { jobs }) =>
        inProgressJobsAdapter.addMany(jobs, {
            ...state,
            inProgressJobsAreLoaded: true,
            inProgressJobsAreLoading: false,
        })
    ),
    on(loadInProgressJobsFail, (state, { error }) => {
        return {
            ...state,
            error,
        };
    })
);

export const completedJobsReducer = createReducer<CompletedJobsEntityState>(
    initialCompletedJobsState,
    on(loadCompletedJobs, (state) => {
        return {
            ...state,
            completedJobsAreLoading: true,
        };
    }),
    on(loadCompletedJobsSuccess, (state, { jobs }) =>
        completedJobsAdapter.addMany(jobs, { ...state, completedJobsAreLoaded: true, completedJobsAreLoading: false })
    ),
    on(loadCompletedJobsFail, (state, { error }) => {
        return {
            ...state,
            error,
        };
    })
);

export const reducers = combineReducers({
    inProgressJobs: inProgressJobsReducer,
    completedJobs: completedJobsReducer,
});

export function jobReducer(state: JobState | undefined, action: Action): JobState {
    return reducers(state, action);
}
