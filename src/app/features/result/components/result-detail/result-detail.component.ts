import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../../../shared/models/jobs.model';
import { ResultDetailService } from './result-detail.service';
import { ResultResponse } from '../../../../shared/models/result-table.model';

declare const Jmol: any;

@Component({
    selector: 'app-result-detail',
    templateUrl: './result-detail.component.html',
    styleUrls: ['./result-detail.component.scss'],
})
export class ResultDetailComponent implements OnInit, AfterViewInit {
    @Input() jobId: string | null = null;
    @Input() job$: Observable<Job | null> | null = null;
    @ViewChild('appletContainer', { static: false }) appletContainer!: ElementRef;

    resultData: ResultResponse | null = null;
    private appletObject: any;

    JSmolStyle = {
        width: '100vw',
        height: 'calc(100vh - 100px)',
    };

    constructor(private resultDetailService: ResultDetailService, private renderer: Renderer2) {}

    ngOnInit(): void {
        if (this.jobId) {
            this.resultDetailService.getResultData(this.jobId).subscribe((data) => {
                this.resultData = data;
                this.loadJSmolIfDataAvailable();
            });
        }
    }

    ngAfterViewInit(): void {
        this.loadJSmolIfDataAvailable();
    }

    private loadJSmolIfDataAvailable(): void {
        if (this.resultData?.['structure information']) {
            this.loadJSmol();
        }
    }

    private loadJSmol(): void {
        this.loadJSmolWithPromise()
            .then(() => {
                this.loadFile();
            })
            .catch((err) => console.error('Error loading JSmol:', err));
    }

    private loadJSmolWithPromise(): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '../../../../../assets/jsmol/JSmol.min.js';
            script.onload = () => {
                const info = {
                    color: '#D6D6D6',
                    width: '100%',
                    height: '100%',
                    use: 'HTML5',
                    j2sPath: '../../../../../assets/jsmol/j2s',
                    serverURL: '../../../../../assets/jsmol/php/jsmol.php',
                };

                this.appletObject = Jmol.getApplet('jsmolApplet', info);
                const appletHtml = Jmol.getAppletHtml(this.appletObject);
                this.appletContainer.nativeElement.innerHTML = appletHtml;
                resolve();
            };
            script.onerror = (error) => {
                console.error('Error loading JSmol script:', error);
                reject(error);
            };
            this.renderer.appendChild(document.body, script);
        });
    }

    private loadFile(): void {
        if (this.resultData?.['structure information']) {
            const structureId = Object.keys(this.resultData['structure information'])[0];
            const fileContent = this.resultData['structure information'][structureId].visualData.dataContent;
            const script = `load data "model" ${fileContent} end "model"`;
            Jmol.script(this.appletObject, script);
        }
    }

    handleClick(id: number, index: number, dataContent: string): void {
        console.log(`Clicked on ID ${id} at index ${index} with content ${dataContent}`);
        // TODO: Implement the click handling logic here
    }
}
