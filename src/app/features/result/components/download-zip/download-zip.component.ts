import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environments';
import { Observable } from 'rxjs';
import { Job } from '../../../../shared/models/jobs.model';

@Component({
    selector: 'app-download-zip',
    templateUrl: './download-zip.component.html',
    styleUrls: ['./download-zip.component.scss'],
})
export class DownloadZipComponent {
    @Input() job_id: string | null = null;


    constructor(private http: HttpClient) {
    }

    onButtonClick(){
        console.log(this.job_id);
        this.getZipFile();
    }

    getZipFile() {
        if (this.job_id) {
            this.http.get(`${environment.api.serverUrl}/jobs/download/${this.job_id}`).subscribe(
                (response: any) => {
                    const presignedUrl = response.url;
                    this.downloadFile(presignedUrl);
                },
                (error) => {
                    console.error('Error occured: ', error);
                }
            )
        }
    }

    downloadFile(url: string) {
        if (this.job_id) {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = this.job_id;
            anchor.click();
        }
    }
}