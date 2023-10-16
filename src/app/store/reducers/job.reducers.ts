import { Action, combineReducers, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Job, PaginatedJob } from '../../shared/models/jobs.model';
import { AppState } from '..';
import {
    loadCompletedJobs,
    loadCompletedJobsFail,
    loadCompletedJobsSuccess,
    loadInProgressJobs,
    loadInProgressJobsFail,
    loadInProgressJobsSuccess,
    postNewJobFail,
    postNewJobSuccess,
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

export interface CompletedJobsEntityState {
    paginatedJobs: PaginatedJob | null;
    completedJobsAreLoading: boolean;
    completedJobsAreLoaded: boolean;
    error: string | null;
}

export const initialInProgressJobsState: InProgressJobsEntityState = inProgressJobsAdapter.getInitialState({
    inProgressJobsAreLoading: false,
    inProgressJobsAreLoaded: false,
    error: null,
});

export const initialCompletedJobsState: CompletedJobsEntityState = {
    paginatedJobs: null,
    completedJobsAreLoading: false,
    completedJobsAreLoaded: false,
    error: null,
};

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
    }),
    // add newly submitted jobs to inprogress state
    on(postNewJobSuccess, (state, { job }) =>
        inProgressJobsAdapter.upsertOne(job, {
            ...state,
            inProgressJobsAreLoaded: true,
            inProgressJobsAreLoading: false,
        })
    ),
    on(postNewJobFail, (state, { error }) => {
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
    on(loadCompletedJobsSuccess, (state, { paginatedJobs }) => {
        return {
            ...state,
            completedJobsAreLoaded: true,
            completedJobsAreLoading: false,
            paginatedJobs,
        };
    }),
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
