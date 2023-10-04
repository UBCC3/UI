import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    AvailableBasisSet,
    AvailableCalculation,
    AvailableMethod,
} from '../../shared/models/calculation-management.model';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class NewCalculationService {
    constructor(private http: HttpClient) {}

    getAvailableCalculations(): Observable<AvailableCalculation[]> {
        return this.http.get<AvailableCalculation[]>(
            `${environment.api.serverUrl}/calculations/get-available-calculations`
        );
    }

    getAvailableBasisSets(): Observable<AvailableBasisSet[]> {
        return this.http.get<AvailableBasisSet[]>(`${environment.api.serverUrl}/calculations/get-available-basis-sets`);
    }

    getAvailableMethods(): Observable<AvailableMethod[]> {
        return this.http.get<AvailableMethod[]>(`${environment.api.serverUrl}/calculations/get-available-methods`);
    }
}
