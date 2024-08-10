import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../shared/models/jobs.model';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class ResultService {
    constructor(private http: HttpClient) {}

    getJobById$(jobId: string): Observable<Job> {
        return this.http.get<Job>(`${environment.api.serverUrl}/jobs/${jobId}`);
    }
}
