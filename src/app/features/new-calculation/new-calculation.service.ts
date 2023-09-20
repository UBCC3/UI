import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    AvailableBasisSet,
    AvailableCalculation,
    AvailableMethod,
} from '../../shared/models/calculation-management.model';

@Injectable({
    providedIn: 'root',
})
export class NewCalculationService {
    constructor(private http: HttpClient) {}

    getAvailableCalculations(): Observable<AvailableCalculation[]> {
        return this.http.get<AvailableCalculation[]>('http://localhost:8000/calculations/get-available-calculations');
    }

    getAvailableBasisSets(): Observable<AvailableBasisSet[]> {
        return this.http.get<AvailableBasisSet[]>('http://localhost:8000/calculations/get-available-basis-sets');
    }

    getAvailableMethods(): Observable<AvailableMethod[]> {
        return this.http.get<AvailableMethod[]>('http://localhost:8000/calculations/get-available-methods');
    }
}
