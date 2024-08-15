import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class StructureDetailService {
    constructor(private http: HttpClient) {}

    getInitStructureFile(jobId: string): Observable<Blob> {
        return this.http.get(`${environment.api.serverUrl}/structures/read-file/${jobId}`, {
            responseType: 'blob',
        });
    }
}
