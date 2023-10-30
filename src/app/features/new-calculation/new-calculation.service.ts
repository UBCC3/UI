import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    AvailableBasisSet,
    AvailableCalculation,
    AvailableMethod,
} from '../../shared/models/calculation-management.model';
import { environment } from '../../../environments/environments';
import { Job, NewJobDTO } from '../../shared/models/jobs.model';

@Injectable({
    providedIn: 'root',
})
export class NewCalculationService {
    constructor(private http: HttpClient) {}

    getAvailableCalculations$(): Observable<AvailableCalculation[]> {
        return this.http.get<AvailableCalculation[]>(
            `${environment.api.serverUrl}/calculations/get-available-calculations`
        );
    }

    getAvailableBasisSets$(): Observable<AvailableBasisSet[]> {
        return this.http.get<AvailableBasisSet[]>(`${environment.api.serverUrl}/calculations/get-available-basis-sets`);
    }

    getAvailableMethods$(): Observable<AvailableMethod[]> {
        return this.http.get<AvailableMethod[]>(`${environment.api.serverUrl}/calculations/get-available-methods`);
    }

    submitNewCalculation$(dto: NewJobDTO): Observable<Job> {
        const formData = new FormData();
        for (const key in dto) {
            if (dto.hasOwnProperty(key as keyof NewJobDTO)) {
                if (key === 'parameters') formData.append(key, JSON.stringify(dto[key]));
                else formData.append(key, dto[key]);
            }
        }

        return this.http.post<Job>(`${environment.api.serverUrl}/jobs/`, formData);
    }

    deleteCompletedJob$(jobId: string): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.api.serverUrl}/jobs/${jobId}`);
    }
}
