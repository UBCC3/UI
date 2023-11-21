import { Action, combineReducers, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Job, PaginatedJob } from '../../shared/models/jobs.model';
import { AppState } from '..';
import {
    deleteCompletedJob,
    deleteCompletedJobFail,
    deleteCompletedJobSuccess,
    loadCompletedJobs,
    loadCompletedJobsFail,
    loadCompletedJobsSuccess,
    loadInProgressJobs,
    loadInProgressJobsFail,
    loadInProgressJobsSuccess,
    postNewJobFail,
    postNewJobSuccess,
    setNewJobIsSubmitting,
    updateJob,
    updateJobFail,
    updateJobSuccess,
} from '../actions/job.actions';

export interface JobState {
    inProgressJobs: InProgressJobsEntityState;
    completedJobs: CompletedJobsEntityState;
}

export interface InProgressJobsEntityState extends EntityState<Job> {
    inProgressJobsAreLoading: boolean;
    inProgressJobsAreLoaded: boolean;
    newJobIsSubmitting: boolean;
    newJobIsSubmitted: boolean;
    error: string | null;
    newJobSubmittingError: string | null;
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
    newJobIsSubmitting: false,
    newJobIsSubmitted: false,
    error: null,
    newJobSubmittingError: null,
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
            inProgressJobsAreLoaded: false,
        };
    }),
    on(loadInProgressJobsSuccess, (state, { jobs }) => {
        const newJobIds = jobs.map((job) => job.id);

        const newState = {
            ...state,
            inProgressJobsAreLoaded: true,
            inProgressJobsAreLoading: false,
        };

        const { ids, entities } = newState;

        const stringIds = ids.map(String);

        const updatedIds = stringIds.filter((id) => newJobIds.includes(id));

        const updatedState = inProgressJobsAdapter.upsertMany(jobs, {
            ...newState,
            ids: updatedIds,
        });

        return updatedState;
    }),
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
            newJobIsSubmitted: true,
            newJobIsSubmitting: false,
        })
    ),
    on(setNewJobIsSubmitting, (state) => {
        return {
            ...state,
            newJobIsSubmitting: true,
        };
    }),
    on(postNewJobFail, (state, { error }) => {
        return {
            ...state,
            newJobIsSubmitting: false,
            newJobSubmittingError: error,
        };
    }),
    on(updateJob, (state) => {
        return {
            ...state,
            completedJobsAreLoading: true,
        };
    }),
    on(updateJobSuccess, (state, { jobId }) => {
        return {
            ...state,
        };
    }),
    on(updateJobFail, (state, { error }) => {
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
    }),
    on(deleteCompletedJob, (state) => {
        return {
            ...state,
            completedJobsAreLoading: true,
        };
    }),
    on(deleteCompletedJobSuccess, (state, { jobId }) => {
        return {
            ...state,
        };
    }),
    on(deleteCompletedJobFail, (state, { error }) => {
        return {
            ...state,
            error,
        };
    })
    // on(updateJob, (state) => {
    //     return {
    //         ...state,
    //         completedJobsAreLoading: true,
    //     };
    // }),
    // on(updateJobSuccess, (state, { jobId }) => {
    //     return {
    //         ...state,
    //     };
    // }),
    // on(updateJobFail, (state, { error }) => {
    //     return {
    //         ...state,
    //         error,
    //     };
    // })
);

export const reducers = combineReducers({
    inProgressJobs: inProgressJobsReducer,
    completedJobs: completedJobsReducer,
});

export function jobReducer(state: JobState | undefined, action: Action): JobState {
    return reducers(state, action);
}
