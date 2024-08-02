import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, PaginatedJob } from '../../shared/models/jobs.model';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getInProgressJobs$(email: string): Observable<Job[]> {
        const params = new HttpParams().set('email', email);
        const res = this.http.get<Job[]>(`${environment.api.serverUrl}/jobs/in-progress`, { params });
        console.log(res);
        return res;
    }

    getCompletedJobs$(email: string, limit: number, offset: number, filter: string): Observable<PaginatedJob> {
        const params = new HttpParams()
            .set('email', email)
            .set('limit', limit.toString())
            .set('offset', offset.toString())
            .set('filter', filter);
        return this.http.get<PaginatedJob>(`${environment.api.serverUrl}/jobs/completed`, { params });
    }
}
