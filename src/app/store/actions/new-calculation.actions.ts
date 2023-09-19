import { createAction, props } from '@ngrx/store';
import { AvailableBasisSet, AvailableCalculation, AvailableMethod } from '../../shared/models/new-calculation.model';

export const loadAvailableCalculations = createAction('[NewCalculation] load available Calculations');

export const loadAvailableCalculationsSuccess = createAction(
    '[NewCalculation] load available calculation success',
    props<{ availableCalculations: AvailableCalculation[] }>()
);

export const loadAvailableCalculationsFail = createAction(
    '[NewCalculation] load available calculations failed',
    props<{ error: string }>()
);
