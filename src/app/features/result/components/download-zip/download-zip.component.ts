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
export class DownloadZipComponent implements OnInit {
    @Input() job$: Observable<Job | null> | null = null;

    job: Job | null = null;
    parameterEntries: { key: string; value: string }[] = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        if (this.job$) {
            this.job$.subscribe((job) => {
                this.job = job;
                if (job) {
                    this.parameterEntries = Object.entries(job.parameters || {})
                        .filter(([key, value]) => value !== null && value !== undefined)
                        .map(([key, value]) => ({ key, value: value as string }));
                }
            });
        }
    }

    onButtonClick(){
        console.log('Button Clicked!');
        this.getZipFile();
    }

    getZipFile() {
        if (this.job) {
            this.http.get(`${environment.api.serverUrl}/download/${this.job.id}`).subscribe(
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
        if (this.job) {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = this.job.id;
            anchor.click();
        }
    }
}