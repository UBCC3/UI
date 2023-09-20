import { ActionReducerMap } from '@ngrx/store';
import { UserState, userReducer } from './reducers/user.reducers';
import { CalculationManagementState, calculationManagementReducer } from './reducers/calculation-management.reducer';

export interface AppState {
    user: UserState;
    calculationManagement: CalculationManagementState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    calculationManagement: calculationManagementReducer,
};
