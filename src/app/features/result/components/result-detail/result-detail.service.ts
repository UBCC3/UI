import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environments';
import { ResultResponse } from '../../../../shared/models/result-table.model';

@Injectable({
    providedIn: 'root',
})
export class ResultDetailService {
    private readonly testLocalFilePath = '../../../../../assets/mock-result-data.json';

    constructor(private http: HttpClient) {}

    getResultData(jobId: string): Observable<ResultResponse> {
        // return this.http.get<ResultResponse>(`${environment.api.serverUrl}/jobs/${jobId}`);
        return this.http.get<ResultResponse>(this.testLocalFilePath);
    }
}
