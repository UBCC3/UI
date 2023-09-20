import { Action, createReducer, on } from '@ngrx/store';
import {
    AvailableBasisSet,
    AvailableCalculation,
    AvailableMethod,
} from '../../shared/models/calculation-management.model';
import {
    loadAvailableCalculations,
    loadAvailableCalculationsSuccess,
    loadAvailableCalculationsFail,
    loadAvailableBasisSets,
    loadAvailableBasisSetsSuccess,
    loadAvailableBasisSetsFail,
    loadAvailableMethods,
    loadAvailableMethodsSuccess,
    loadAvailableMethodsFail,
} from '../actions/calculation-management.actions';

export interface CalculationManagementState {
    availableCalculations: AvailableCalculation[] | null;
    availableCalculationsAreLoading: boolean;
    availableCalculationsAreLoaded: boolean;
    availableCalculationsError: string;
    availableBasisSets: AvailableBasisSet[] | null;
    availableBasisSetsAreLoading: boolean;
    availableBasisSetsAreLoaded: boolean;
    availableBasisSetsError: string;
    availableMethods: AvailableMethod[] | null;
    availableMethodsAreLoading: boolean;
    availableMethodsAreLoaded: boolean;
    availableMethodsError: string;
}

const initialState: CalculationManagementState = {
    availableCalculations: null,
    availableCalculationsAreLoading: false,
    availableCalculationsAreLoaded: false,
    availableCalculationsError: '',
    availableBasisSets: null,
    availableBasisSetsAreLoading: false,
    availableBasisSetsAreLoaded: false,
    availableBasisSetsError: '',
    availableMethods: null,
    availableMethodsAreLoading: false,
    availableMethodsAreLoaded: false,
    availableMethodsError: '',
};

const reducer = createReducer<CalculationManagementState>(
    initialState,
    // Available Calculations
    on(loadAvailableCalculations, (state) => ({
        ...state,
        availableCalculationsAreLoading: true,
    })),
    on(loadAvailableCalculationsSuccess, (state, { availableCalculations }) => {
        return {
            ...state,
            availableCalculations,
            availableCalculationsAreLoading: false,
            availableCalculationsAreLoaded: true,
        };
    }),
    on(loadAvailableCalculationsFail, (state, { error }) => ({
        ...state,
        availableCalculationsAreLoading: false,
        availableCalculationsError: error,
    })),
    // Available Basis Sets
    on(loadAvailableBasisSets, (state) => ({
        ...state,
        availableBasisSetsAreLoading: true,
    })),
    on(loadAvailableBasisSetsSuccess, (state, { availableBasisSets }) => {
        return {
            ...state,
            availableBasisSets,
            availableBasisSetsAreLoading: false,
            availableBasisSetsAreLoaded: true,
        };
    }),
    on(loadAvailableBasisSetsFail, (state, { error }) => ({
        ...state,
        availableBasisSetsAreLoading: false,
        availableBasisSetsError: error,
    })),
    // Available Methods
    on(loadAvailableMethods, (state) => ({
        ...state,
        availableMethodsAreLoading: true,
    })),
    on(loadAvailableMethodsSuccess, (state, { availableMethods }) => {
        return {
            ...state,
            availableMethods,
            availableMethodsAreLoading: false,
            availableMethodsAreLoaded: true,
        };
    }),
    on(loadAvailableMethodsFail, (state, { error }) => ({
        ...state,
        availableMethodsAreLoading: false,
        availableMethodsError: error,
    }))
);

export function calculationManagementReducer(
    state: CalculationManagementState | undefined,
    action: Action
): CalculationManagementState {
    return reducer(state, action);
}
