import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculationOption } from '../../shared/models/calculation-option.model';
import { environment } from '../../../environments/environments';
import { Job, NewJobDTO, UpdateJobDTO } from '../../shared/models/jobs.model';

@Injectable({
    providedIn: 'root',
})
export class NewCalculationService {
    constructor(private http: HttpClient) {}

    getAvailableCalculations$(): Observable<CalculationOption[]> {
        return this.http.get<CalculationOption[]>(
            `${environment.api.serverUrl}/calculations/get-available-calculations`
        );
    }

    getAvailableBasisSets$(): Observable<CalculationOption[]> {
        return this.http.get<CalculationOption[]>(`${environment.api.serverUrl}/calculations/get-available-basis-sets`);
    }

    getAvailableMethods$(): Observable<CalculationOption[]> {
        return this.http.get<CalculationOption[]>(`${environment.api.serverUrl}/calculations/get-available-methods`);
    }

    getAvailableSolventEffects$(): Observable<CalculationOption[]> {
        return this.http.get<CalculationOption[]>(`${environment.api.serverUrl}/calculations/get-solvent-effects`);
    }

    submitNewCalculation$(dto: NewJobDTO): Observable<Job> {
        const formData = new FormData();
        for (const key in dto) {
            if (Object.prototype.hasOwnProperty.call(dto, key as keyof NewJobDTO)) {
                if (key === 'parameters') formData.append(key, JSON.stringify(dto[key]));
                else formData.append(key, dto[key]);
            }
        }

        return this.http.post<Job>(`${environment.api.serverUrl}/jobs/`, formData);
    }

    deleteCompletedJob$(jobId: string): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.api.serverUrl}/jobs/${jobId}`);
    }

    // TODO: type
    patchJob$(jobId: string, dto: UpdateJobDTO): Observable<any> {
        return this.http.patch<any>(`${environment.api.serverUrl}/jobs/${jobId}`, dto);
    }
}
