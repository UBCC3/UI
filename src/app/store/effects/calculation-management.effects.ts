import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NewCalculationService } from '../../features/new-calculation/new-calculation.service';
import {
    loadAvailableBasisSets,
    loadAvailableBasisSetsFail,
    loadAvailableBasisSetsSuccess,
    loadAvailableCalculations,
    loadAvailableCalculationsFail,
    loadAvailableCalculationsSuccess,
    loadAvailableMethods,
    loadAvailableMethodsFail,
    loadAvailableMethodsSuccess,
    loadAvailableSolventEffects,
    loadAvailableSolventEffectsFail,
    loadAvailableSolventEffectsSuccess,
} from '../actions/calculation-management.actions';
import {
    selectAvailableBasisSets,
    selectAvailableCalculations,
    selectAvailableMethods,
    selectAvailableSolventEffects,
} from '../selectors/calculation-management.selectors';
import { ToastService } from '../../shared/services/toast.service';
import { ToastType } from '../../shared/models/toast-type.enum';

@Injectable()
export class CalculationManagementEffects {
    loadAvailableCalculations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAvailableCalculations),
            withLatestFrom(this.store.select(selectAvailableCalculations)), // Check if data exists in the state;
            switchMap(([action, availableCalculations]) => {
                if (availableCalculations.length > 0) {
                    // Data already exists in the state, no need to fetch
                    return of(loadAvailableCalculationsSuccess({ availableCalculations }));
                } else {
                    // Data doesn't exist in the state, fetch it from the API
                    return this.newCalculationService.getAvailableCalculations$().pipe(
                        map((availableCalculations) => loadAvailableCalculationsSuccess({ availableCalculations })),
                        catchError((error) => {
                            this.toastService.toast({
                                type: ToastType.Error,
                            });

                            return of(loadAvailableCalculationsFail({ error }));
                        })
                    );
                }
            })
        )
    );

    loadAvailableBasisSets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAvailableBasisSets),
            withLatestFrom(this.store.select(selectAvailableBasisSets)), // Check if data exists in the state
            switchMap(([action, availableBasisSets]) => {
                if (availableBasisSets.length > 0) {
                    // Data already exists in the state, no need to fetch
                    return of(loadAvailableBasisSetsSuccess({ availableBasisSets }));
                } else {
                    // Data doesn't exist in the state, fetch it from the API
                    return this.newCalculationService.getAvailableBasisSets$().pipe(
                        map((availableBasisSets) => loadAvailableBasisSetsSuccess({ availableBasisSets })),
                        catchError((error) => {
                            this.toastService.toast({
                                type: ToastType.Error,
                            });
                            return of(loadAvailableBasisSetsFail({ error }));
                        })
                    );
                }
            })
        )
    );

    loadAvailableMethods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAvailableMethods),
            withLatestFrom(this.store.select(selectAvailableMethods)), // Check if data exists in the state
            switchMap(([action, availableMethods]) => {
                if (availableMethods.length > 0) {
                    // Data already exists in the state, no need to fetch
                    return of(loadAvailableMethodsSuccess({ availableMethods }));
                } else {
                    // Data doesn't exist in the state, fetch it from the API
                    return this.newCalculationService.getAvailableMethods$().pipe(
                        map((availableMethods) => loadAvailableMethodsSuccess({ availableMethods })),
                        catchError((error) => {
                            this.toastService.toast({
                                type: ToastType.Error,
                            });
                            return of(loadAvailableMethodsFail({ error }));
                        })
                    );
                }
            })
        )
    );

    loadAvailableSolventEffects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAvailableSolventEffects),
            withLatestFrom(this.store.select(selectAvailableSolventEffects)), // Check if data exists in the state
            switchMap(([action, availableSolventEffects]) => {
                if (availableSolventEffects.length > 0) {
                    // Data already exists in the state, no need to fetch
                    return of(loadAvailableSolventEffectsSuccess({ availableSolventEffects }));
                } else {
                    // Data doesn't exist in the state, fetch it from the API
                    return this.newCalculationService.getAvailableSolventEffects$().pipe(
                        map((availableSolventEffects) =>
                            loadAvailableSolventEffectsSuccess({ availableSolventEffects })
                        ),
                        catchError((error) => {
                            this.toastService.toast({
                                type: ToastType.Error,
                            });
                            return of(loadAvailableSolventEffectsFail({ error }));
                        })
                    );
                }
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private newCalculationService: NewCalculationService,
        private toastService: ToastService
    ) {}
}
