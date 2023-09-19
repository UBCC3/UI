import { ActionReducerMap } from '@ngrx/store';
import { UserState, userReducer } from './reducers/user.reducers';
import { NewCalculationState, newCalculationReducer } from './reducers/new-calculation.reducers';

export interface AppState {
    user: UserState;
    newCalculation: NewCalculationState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    newCalculation: newCalculationReducer,
};
