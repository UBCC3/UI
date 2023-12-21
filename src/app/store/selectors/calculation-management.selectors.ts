import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    CalculationManagementState,
    availableBasisSetsAdapter,
    availableCalculationsAdapter,
    availableMethodsAdapter,
    availableSolventEffectsAdapter,
} from '../reducers/calculation-management.reducer';

// Available Calculations
const {
    selectAll: selectAllAvailableCalculations,
    selectEntities: selectEntitiesAvailableCalculations,
    selectIds: selectIdsAvailableCalculations,
} = availableCalculationsAdapter.getSelectors();

export const selectCalculationManagementState =
    createFeatureSelector<CalculationManagementState>('calculationManagement');

export const selectAvailableCalculationsState = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.availableCalculations
);
export const selectAvailableCalculations = createSelector(
    selectAvailableCalculationsState,
    selectAllAvailableCalculations
);
export const selectAvailableCalculationsById = createSelector(
    selectAvailableCalculationsState,
    selectEntitiesAvailableCalculations
);
export const selectAvailableCalculationsId = createSelector(
    selectAvailableCalculationsState,
    selectIdsAvailableCalculations
);
export const selectAvailableCalculationsAreLoading = createSelector(
    selectAvailableCalculationsState,
    (state) => state?.availableCalculationsAreLoading
);
export const selectAvailableCalculationsAreLoaded = createSelector(
    selectAvailableCalculationsState,
    (state) => state?.availableCalculationsAreLoaded
);
export const selectAvailableCalculationsError = createSelector(
    selectAvailableCalculationsState,
    (state) => state?.availableCalculationsError
);

// Available Basis Sets
const {
    selectAll: selectAllAvailableBasisSets,
    selectEntities: selectEntitiesAvailableBasisSets,
    selectIds: selectIdsAvailableBasisSets,
} = availableBasisSetsAdapter.getSelectors();

export const selectAvailableBasisSetsState = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.availableBasisSets
);
export const selectAvailableBasisSets = createSelector(selectAvailableBasisSetsState, selectAllAvailableBasisSets);
export const selectAvailableBasisSetsById = createSelector(
    selectAvailableBasisSetsState,
    selectEntitiesAvailableBasisSets
);
export const selectAvailableBasisSetsId = createSelector(selectAvailableBasisSetsState, selectIdsAvailableCalculations);
export const selectAvailableBasisSetsAreLoading = createSelector(
    selectAvailableBasisSetsState,
    (state) => state?.availableBasisSetsAreLoading
);
export const selectAvailableBasisSetsAreLoaded = createSelector(
    selectAvailableBasisSetsState,
    (state) => state?.availableBasisSetsAreLoaded
);

export const selectAvailableBasisSetsError = createSelector(
    selectAvailableBasisSetsState,
    (state) => state?.availableBasisSetsError
);

// Available Methods
const {
    selectAll: selectAllAvailableMethods,
    selectEntities: selectEntitiesAvailableMethods,
    selectIds: selectIdsAvailableMethods,
} = availableMethodsAdapter.getSelectors();

export const selectAvailableMethodsState = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.availableMethods
);
export const selectAvailableMethods = createSelector(selectAvailableMethodsState, selectAllAvailableMethods);
export const selectAvailableMethodsById = createSelector(selectAvailableMethodsState, selectEntitiesAvailableMethods);
export const selectAvailableMethodsId = createSelector(selectAvailableMethodsState, selectIdsAvailableMethods);
export const selectAvailableMethodsAreLoading = createSelector(
    selectAvailableMethodsState,
    (state) => state?.availableMethodsAreLoading
);
export const selectAvailableMethodsAreLoaded = createSelector(
    selectAvailableMethodsState,
    (state) => state?.availableMethodsAreLoaded
);
export const selectAvailableMethodsError = createSelector(
    selectAvailableMethodsState,
    (state) => state?.availableMethodsError
);

// Available Solvent Effects
const {
    selectAll: selectAllAvailableSolventEffects,
    selectEntities: selectEntitiesAvailableSolventEffects,
    selectIds: selectIdsAvailableSolventEffects,
} = availableSolventEffectsAdapter.getSelectors();

export const selectAvailableSolventEffectsState = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.availableSolventEffects
);
export const selectAvailableSolventEffects = createSelector(
    selectAvailableSolventEffectsState,
    selectAllAvailableSolventEffects
);
export const selectAvailableSolventEffectsById = createSelector(
    selectAvailableSolventEffectsState,
    selectEntitiesAvailableSolventEffects
);
export const selectAvailableSolventEffectsId = createSelector(
    selectAvailableSolventEffectsState,
    selectIdsAvailableSolventEffects
);
export const selectAvailableSolventEffectsAreLoading = createSelector(
    selectAvailableSolventEffectsState,
    (state) => state?.availableSolventEffectsAreLoading
);
export const selectAvailableSolventEffectsAreLoaded = createSelector(
    selectAvailableSolventEffectsState,
    (state) => state?.availableSolventEffectsAreLoaded
);
export const selectAvailableSolventEffectsError = createSelector(
    selectAvailableSolventEffectsState,
    (state) => state?.availableSolventEffectsError
);

// New Calculation Form
export const selectNewCalculationFormState = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.newCalculationForm
);
export const selectNewCalculationForm = createSelector(
    selectNewCalculationFormState,
    (state) => state?.newCalculationForm
);
export const selectNewCalculationFormError = createSelector(
    selectNewCalculationFormState,
    (state) => state?.newCalculationFormError
);
