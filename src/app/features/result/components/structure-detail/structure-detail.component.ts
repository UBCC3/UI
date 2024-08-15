import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import { StructureDetailService } from './structure-detail.service';
declare const Jmol: any;

@Component({
    selector: 'app-structure-detail',
    templateUrl: './structure-detail.component.html',
    styleUrls: ['./structure-detail.component.scss'],
})
export class StructureDetailComponent implements AfterViewInit {
    //need to change it back to OnInit
    @Input() jobId: string | null = null;
    @ViewChild('appletContainer', { static: false }) appletContainer!: ElementRef;

    // file!: File;
    // constructor(private structureDetailService: StructureDetailService) {}
    private appletObject: any;
    JSmolStyle = {
        width: '95vw',
        height: 'calc(100vh - 66.5px)',
    };
    constructor(private renderer: Renderer2) {}

    // ngOnInit(): void {
    //     if (this.jobId) {
    //         console.log('Received jobId:', this.jobId);
    //         this.structureDetailService.getInitStructureFile(this.jobId).subscribe({
    //             next: (file: Blob) => {
    //                 // TODO: update with the actual file name
    //                 this.file = new File([file], 'structure.pdb', { type: 'text/plain' });
    //                 this.displayFileWithJSmol();
    //             },
    //             error: (error) => {
    //                 console.error('Error fetching file from S3', error);
    //             },import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

    //             complete: () => {
    //                 console.log('File fetching completed');
    //             },
    //         });
    //     }
    // }

    ngAfterViewInit(): void {
        this.loadJSmolWithPromise()
            .then(() => {
                if (this.jobId) {
                    this.loadFile();
                }
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

    private loadFile() {
        // This method should be adapted to use your local file system
        // For local testing, we use a static file path
        const filePath = '../../../../../assets/1aho.pdb';
        fetch(filePath)
            .then((response) => response.text())
            .then((fileContents) => {
                const script = `load data "model" ${fileContents} end "model"`;
                Jmol.script(this.appletObject, script);
            })
            .catch((err) => console.error('Error fetching file:', err));
    }
}
