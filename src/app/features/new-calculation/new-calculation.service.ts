import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableCalculation } from '../../shared/models/new-calculation.model';

@Injectable({
    providedIn: 'root',
})
export class NewCalculationService {
    constructor(private http: HttpClient) {}

    getAvailableCalculation(): Observable<AvailableCalculation[]> {
        return this.http.get<AvailableCalculation[]>('http://localhost:8000/calculations/get-available-calculations');
    }
}
