import { ActionReducerMap } from '@ngrx/store';
import { UserState, userReducer } from './reducers/user.reducers';
import { CalculationManagementState, calculationManagementReducer } from './reducers/calculation-management.reducer';
import { JobState, jobReducer } from './reducers/job.reducers';

export interface AppState {
    user: UserState;
    calculationManagement: CalculationManagementState;
    job: JobState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    calculationManagement: calculationManagementReducer,
    job: jobReducer,
};
