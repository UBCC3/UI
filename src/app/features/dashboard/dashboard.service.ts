import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../shared/models/jobs.model';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getInProgressJobs(email: string): Observable<Job[]> {
        const params = new HttpParams().set('email', email);

        return this.http.get<Job[]>('http://localhost:8000/jobs/in-progress', { params });
    }

    getCompletedJobs(email: string): Observable<Job[]> {
        const params = new HttpParams().set('email', email);
        return this.http.get<Job[]>('http://localhost:8000/jobs/completed', { params });
    }
}
