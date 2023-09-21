import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalculationManagementState } from '../reducers/calculation-management.reducer';

export const selectCalculationManagementState =
    createFeatureSelector<CalculationManagementState>('calculationManagement');

export const selectAvailableCalculations = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.availableCalculations
);

export const selectAvailableCalculationsAreLoading = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableCalculationsAreLoading
);

export const selectAvailableCalculationsAreLoaded = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableCalculationsAreLoaded
);

export const selectAvailableCalculationsError = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableCalculationsError
);

export const selectAvailableBasisSets = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.availableBasisSets
);

export const selectAvailableBasisSetsAreLoading = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableBasisSetsAreLoading
);

export const selectAvailableBasisSetsAreLoaded = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableBasisSetsAreLoaded
);

export const selectAvailableBasisSetsError = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableBasisSetsError
);

export const selectAvailableMethods = createSelector(
    selectCalculationManagementState,
    (state: CalculationManagementState) => state?.availableMethods
);

export const selectAvailableMethodsAreLoading = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableMethodsAreLoading
);

export const selectAvailableMethodsAreLoaded = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableMethodsAreLoaded
);

export const selectAvailableMethodsError = createSelector(
    selectCalculationManagementState,
    (state) => state?.availableMethodsError
);

export const selectNewCalculationForm = createSelector(
    selectCalculationManagementState,
    (state) => state?.newCalculationForm
);
