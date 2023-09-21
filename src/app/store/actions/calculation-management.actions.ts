import { createAction, props } from '@ngrx/store';
import {
    AvailableBasisSet,
    AvailableCalculation,
    AvailableMethod,
} from '../../shared/models/calculation-management.model';

export const loadAvailableCalculations = createAction('[CalculationManagement] load available calculations');

export const loadAvailableCalculationsSuccess = createAction(
    '[CalculationManagement] load available calculation success',
    props<{ availableCalculations: AvailableCalculation[] }>()
);

export const loadAvailableCalculationsFail = createAction(
    '[CalculationManagement] load available calculations failed',
    props<{ error: string }>()
);

export const loadAvailableBasisSets = createAction('[CalculationManagement] load available basis sets');

export const loadAvailableBasisSetsSuccess = createAction(
    '[CalculationManagement] load available basis sets success',
    props<{ availableBasisSets: AvailableBasisSet[] }>()
);

export const loadAvailableBasisSetsFail = createAction(
    '[CalculationManagement] load available basis sets failed',
    props<{ error: string }>()
);

export const loadAvailableMethods = createAction('[CalculationManagement] load available methods');

export const loadAvailableMethodsSuccess = createAction(
    '[CalculationManagement] load available methods success',
    props<{ availableMethods: AvailableMethod[] }>()
);

export const loadAvailableMethodsFail = createAction(
    '[CalculationManagement] load available methods failed',
    props<{ error: string }>()
);

export const setNewCalculationForm = createAction(
    '[NewCalculation] setting new calculation form',
    props<{ newCalculationForm: any }>() //NOTE: model for this
);

export const resetNewCalculationForm = createAction('[NewCalculation] reset new calculation form');
