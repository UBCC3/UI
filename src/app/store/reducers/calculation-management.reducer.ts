import { Action, combineReducers, createReducer, on } from '@ngrx/store';
import { CalculationOption } from '../../shared/models/calculation-option.model';
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
    setNewCalculationForm,
    resetNewCalculationForm,
    loadAvailableSolventEffects,
    loadAvailableSolventEffectsSuccess,
    loadAvailableSolventEffectsFail,
} from '../actions/calculation-management.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { NewCalculationForm } from '../../shared/models/jobs.model';

export interface CalculationManagementState {
    availableCalculations: AvailableCalculationsEntityState;
    availableBasisSets: AvailableBasisSetsEntityState;
    availableMethods: AvailableMethodsEntityState;
    availableSolventEffects: AvailableSolventEffectsEntityState;
    newCalculationForm: NewCalculationFormState;
}

export interface AvailableCalculationsEntityState extends EntityState<CalculationOption> {
    availableCalculationsAreLoading: boolean;
    availableCalculationsAreLoaded: boolean;
    availableCalculationsError: string | null;
}

export const availableCalculationsAdapter: EntityAdapter<CalculationOption> = createEntityAdapter<CalculationOption>();

export interface AvailableBasisSetsEntityState extends EntityState<CalculationOption> {
    availableBasisSetsAreLoading: boolean;
    availableBasisSetsAreLoaded: boolean;
    availableBasisSetsError: string | null;
}

export const availableBasisSetsAdapter: EntityAdapter<CalculationOption> = createEntityAdapter<CalculationOption>();

export interface AvailableMethodsEntityState extends EntityState<CalculationOption> {
    availableMethodsAreLoading: boolean;
    availableMethodsAreLoaded: boolean;
    availableMethodsError: string | null;
}

export const availableMethodsAdapter: EntityAdapter<CalculationOption> = createEntityAdapter<CalculationOption>();

export interface AvailableSolventEffectsEntityState extends EntityState<CalculationOption> {
    availableSolventEffectsAreLoading: boolean;
    availableSolventEffectsAreLoaded: boolean;
    availableSolventEffectsError: string | null;
}

export const availableSolventEffectsAdapter: EntityAdapter<CalculationOption> =
    createEntityAdapter<CalculationOption>();

export interface NewCalculationFormState {
    newCalculationForm: NewCalculationForm | null;
    newCalculationFormError: string | null;
}

export const initialAvailableCalculationsState: AvailableCalculationsEntityState =
    availableCalculationsAdapter.getInitialState({
        availableCalculationsAreLoaded: false,
        availableCalculationsAreLoading: false,
        availableCalculationsError: null,
    });

export const initialAvailableBasisSetsState: AvailableBasisSetsEntityState = availableBasisSetsAdapter.getInitialState({
    availableBasisSetsAreLoaded: false,
    availableBasisSetsAreLoading: false,
    availableBasisSetsError: null,
});

export const initialAvailableMethodsState: AvailableMethodsEntityState = availableMethodsAdapter.getInitialState({
    availableMethodsAreLoaded: false,
    availableMethodsAreLoading: false,
    availableMethodsError: null,
});

export const initialAvailableSolventEffectsState: AvailableSolventEffectsEntityState =
    availableMethodsAdapter.getInitialState({
        availableSolventEffectsAreLoaded: false,
        availableSolventEffectsAreLoading: false,
        availableSolventEffectsError: null,
    });

export const initialNewCalculationState: NewCalculationFormState = {
    newCalculationForm: null,
    newCalculationFormError: null,
};

export const availableCalculationsReducer = createReducer<AvailableCalculationsEntityState>(
    initialAvailableCalculationsState,
    on(loadAvailableCalculations, (state) => ({
        ...state,
        availableCalculationsAreLoading: true,
    })),
    on(loadAvailableCalculationsSuccess, (state, { availableCalculations }) =>
        availableCalculationsAdapter.addMany(availableCalculations, {
            ...state,
            availableCalculationsAreLoaded: true,
            availableCalculationsAreLoading: false,
        })
    ),
    on(loadAvailableCalculationsFail, (state, { error }) => ({
        ...state,
        availableCalculationsAreLoading: false,
        availableCalculationsError: error,
    }))
);

export const availableBasisSetsReducer = createReducer<AvailableBasisSetsEntityState>(
    initialAvailableBasisSetsState,
    on(loadAvailableBasisSets, (state) => ({
        ...state,
        availableBasisSetsAreLoading: true,
    })),
    on(loadAvailableBasisSetsSuccess, (state, { availableBasisSets }) =>
        availableBasisSetsAdapter.addMany(availableBasisSets, {
            ...state,
            availableBasisSetsAreLoaded: true,
            availableBasisSetsAreLoading: false,
        })
    ),
    on(loadAvailableBasisSetsFail, (state, { error }) => ({
        ...state,
        availableBasisSetsAreLoading: false,
        availableBasisSetsError: error,
    }))
);

export const availableMethodsReducer = createReducer<AvailableMethodsEntityState>(
    initialAvailableMethodsState,
    on(loadAvailableMethods, (state) => ({
        ...state,
        availableMethodsAreLoading: true,
    })),
    on(loadAvailableMethodsSuccess, (state, { availableMethods }) =>
        availableMethodsAdapter.addMany(availableMethods, {
            ...state,
            availableMethodsAreLoaded: true,
            availableMethodsAreLoading: false,
        })
    ),
    on(loadAvailableMethodsFail, (state, { error }) => ({
        ...state,
        availableMethodsAreLoading: false,
        availableMethodsError: error,
    }))
);

export const availableSolventEffectsReducer = createReducer<AvailableSolventEffectsEntityState>(
    initialAvailableSolventEffectsState,
    on(loadAvailableSolventEffects, (state) => ({
        ...state,
        availableSolventEffectsAreLoading: true,
    })),
    on(loadAvailableSolventEffectsSuccess, (state, { availableSolventEffects }) =>
        availableSolventEffectsAdapter.addMany(availableSolventEffects, {
            ...state,
            availableSolventEffectsAreLoaded: true,
            availableSolventEffectsAreLoading: false,
        })
    ),
    on(loadAvailableSolventEffectsFail, (state, { error }) => ({
        ...state,
        availableSolventEffectsAreLoading: false,
        availableSolventEffectsError: error,
    }))
);

export const newCalculationFormReducer = createReducer<NewCalculationFormState>(
    initialNewCalculationState,
    on(setNewCalculationForm, (state, { newCalculationForm }) => {
        return {
            ...state,
            newCalculationForm,
        };
    }),
    on(resetNewCalculationForm, (state) => {
        return {
            ...state,
            newCalculationForm: null,
        };
    })
);

export const reducers = combineReducers({
    availableCalculations: availableCalculationsReducer,
    availableBasisSets: availableBasisSetsReducer,
    availableMethods: availableMethodsReducer,
    availableSolventEffects: availableSolventEffectsReducer,
    newCalculationForm: newCalculationFormReducer,
});

export function calculationManagementReducer(
    state: CalculationManagementState | undefined,
    action: Action
): CalculationManagementState {
    return reducers(state, action);
}
