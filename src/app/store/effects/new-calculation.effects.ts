import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NewCalculationService } from '../../features/new-calculation/new-calculation.service';
import {
    loadAvailableCalculations,
    loadAvailableCalculationsFail,
    loadAvailableCalculationsSuccess,
} from '../actions/new-calculation.actions';
import { selectAvailableCalculations } from '../selectors/new-calculation.selectors';

@Injectable()
export class NewCalculationEffects {
    loadAvailableCalculations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAvailableCalculations),
            withLatestFrom(this.store.select(selectAvailableCalculations)), // Check if data exists in the state
            switchMap(([_, availableCalculations]) => {
                if (availableCalculations) {
                    // Data already exists in the state, no need to fetch
                    return of(loadAvailableCalculationsSuccess({ availableCalculations }));
                } else {
                    // Data doesn't exist in the state, fetch it from the API
                    return this.newCalculationService.getAvailableCalculation().pipe(
                        map((availableCalculations) => loadAvailableCalculationsSuccess({ availableCalculations })),
                        catchError((error) => of(loadAvailableCalculationsFail({ error })))
                    );
                }
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private newCalculationService: NewCalculationService
    ) {}
}
