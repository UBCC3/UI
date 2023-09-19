import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewCalculationState } from '../reducers/new-calculation.reducers';

export const selectNewCalculationState = createFeatureSelector<NewCalculationState>('newCalculation');

export const selectAvailableCalculations = createSelector(
    selectNewCalculationState,
    (state: NewCalculationState) => state?.availableCalculations
);

export const selectAvailableCalculationsAreLoading = createSelector(
    selectNewCalculationState,
    (state) => state?.availableCalculationsLoading
);

export const selectAvailableCalculationsAreLoaded = createSelector(
    selectNewCalculationState,
    (state) => state?.availableCalculationsLoaded
);

export const selectAvailableCalculationsError = createSelector(
    selectNewCalculationState,
    (state) => state?.availableCalculationsError
);
