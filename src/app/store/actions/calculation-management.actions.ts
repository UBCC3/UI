import { createAction, props } from '@ngrx/store';
import { CalculationOption } from '../../shared/models/calculation-option.model';

export const loadAvailableCalculations = createAction('[CalculationManagement] load available calculations');

export const loadAvailableCalculationsSuccess = createAction(
    '[CalculationManagement] load available calculation success',
    props<{ availableCalculations: CalculationOption[] }>()
);

export const loadAvailableCalculationsFail = createAction(
    '[CalculationManagement] load available calculations failed',
    props<{ error: string }>()
);

export const loadAvailableBasisSets = createAction('[CalculationManagement] load available basis sets');

export const loadAvailableBasisSetsSuccess = createAction(
    '[CalculationManagement] load available basis sets success',
    props<{ availableBasisSets: CalculationOption[] }>()
);

export const loadAvailableBasisSetsFail = createAction(
    '[CalculationManagement] load available basis sets failed',
    props<{ error: string }>()
);

export const loadAvailableMethods = createAction('[CalculationManagement] load available methods');

export const loadAvailableMethodsSuccess = createAction(
    '[CalculationManagement] load available methods success',
    props<{ availableMethods: CalculationOption[] }>()
);

export const loadAvailableMethodsFail = createAction(
    '[CalculationManagement] load available methods failed',
    props<{ error: string }>()
);

export const loadAvailableSolventEffects = createAction('[CalculationManagement] load solvent Effects');

export const loadAvailableSolventEffectsSuccess = createAction(
    '[CalculationManagement] load solvent effect success',
    props<{ availableSolventEffects: CalculationOption[] }>()
);

export const loadAvailableSolventEffectsFail = createAction(
    '[CalculationManagement] load solvent effect failed',
    props<{ error: string }>()
);

export const setNewCalculationForm = createAction(
    '[NewCalculation] setting new calculation form',
    props<{ newCalculationForm: any }>() //TODO: model for this
);

export const resetNewCalculationForm = createAction('[NewCalculation] reset new calculation form');
