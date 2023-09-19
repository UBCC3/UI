import { Action, createReducer, on } from '@ngrx/store';
import { AvailableCalculation } from '../../shared/models/new-calculation.model';
import {
    loadAvailableCalculations,
    loadAvailableCalculationsSuccess,
    loadAvailableCalculationsFail,
} from '../actions/new-calculation.actions';

export interface NewCalculationState {
    availableCalculations: AvailableCalculation[] | null;
    availableCalculationsLoading: boolean;
    availableCalculationsLoaded: boolean;
    availableCalculationsError: string;
}

const initialState: NewCalculationState = {
    availableCalculations: null,
    availableCalculationsLoading: false,
    availableCalculationsLoaded: false,
    availableCalculationsError: '',
};

const reducer = createReducer<NewCalculationState>(
    initialState,
    on(loadAvailableCalculations, (state) => ({
        ...state,
        availableCalculationsLoading: true,
    })),
    on(loadAvailableCalculationsSuccess, (state, { availableCalculations }) => {
        return {
            ...state,
            availableCalculations,
            availableCalculationsLoading: false,
            availableCalculationsLoaded: true,
        };
    }),
    on(loadAvailableCalculationsFail, (state, { error }) => ({
        ...state,
        availableCalculationsError: error,
    }))
);

export function newCalculationReducer(state: NewCalculationState | undefined, action: Action): NewCalculationState {
    return reducer(state, action);
}
