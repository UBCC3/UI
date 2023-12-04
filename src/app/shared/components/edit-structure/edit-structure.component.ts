import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { SourceEnum } from '../../models/source.enum';

declare const Jmol: any;

// Set up JSmol applet configuration
const info = {
    color: '#D6D6D6',
    width: '100%',
    height: '100%',
    use: 'HTML5',
    j2sPath: '../../../../assets/jsmol/j2s',
    serverURL: '../../../../assets/jsmol/php/jsmol.php',
};

@Component({
    selector: 'shrd-edit-structure',
    templateUrl: './edit-structure.component.html',
    styleUrls: ['./edit-structure.component.scss'],
})
export class EditStructureComponent implements AfterViewInit {
    @Input()
    file!: File;
    @Input() style!: { [key: string]: string };
    @Input()
    isPreview!: boolean;
    @Input()
    canEdit!: boolean;
    @Input()
    source!: SourceEnum;

    @ViewChild('appletContainer', { static: false }) appletContainer!: ElementRef;
    private appletElement!: HTMLDivElement;
    private appletObject: any;
    appletHtml!: string;

    zoomValue: string;
    toggledDrag: boolean;
    constructor(private renderer: Renderer2) {
        this.zoomValue = '100%';
        this.canEdit = true;
        this.isPreview = false;
        this.toggledDrag = false;
    }

    ngAfterViewInit(): void {
        this.appletElement = this.appletContainer.nativeElement;

        this.loadJSMolWithPromise()
            .then((appletHtml) => {
                this.appletElement.innerHTML = appletHtml;

                if (this.file) {
                    setTimeout(() => {
                        this.loadFile();
                        this.setRightClickMenuAccess();
                    }, 100);
                }
            })

            .catch((err) => console.error('error loading jsmol: ', err));
    }

    loadJSMolWithPromise(): Promise<string> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');

            script.src = '../../../../assets/jsmol/JSmol.min.js';

            script.onload = () => {
                // reference to jmol applet object
                this.appletObject = Jmol.getApplet('jsmolApplet', info);

                // get html for jmol applet
                const appletHtml = Jmol.getAppletHtml(this.appletObject);

                resolve(appletHtml);
            };

            script.onerror = (error) => {
                console.log('error', error);
                reject(error);
            };

            // add script to html
            this.renderer.appendChild(document.body, script);
        });
    }

    loadFile() {
        if (this.file) {
            if (this.source == SourceEnum.CALCULATED) {
                const fileContentsAppended = `load data "model" ${this.file} end "model"`;
                Jmol.script(this.appletObject, fileContentsAppended);
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const fileContents = event.target?.result as string;
                    const fileContentsAppended = `load data "model" ${fileContents} end "model"`;
                    Jmol.script(this.appletObject, fileContentsAppended);
                };

                reader.readAsText(this.file);
            }
        }
    }

    setRightClickMenuAccess() {
        if (!this.canEdit) Jmol.script(this.appletObject, 'set disablePopupMenu TRUE');
        else Jmol.script(this.appletObject, 'set disablePopupMenu FALSE');
    }

    zoomIn(): void {
        const zoomValueFloat = parseFloat(this.zoomValue.slice(0, -1));
        const newZoomValueFloat = zoomValueFloat * 2;
        this.zoomValue = this.formatZoomValue(newZoomValueFloat) + '%';
        Jmol.script(this.appletObject, 'zoom IN');
    }

    zoomOut(): void {
        const zoomValueFloat = parseFloat(this.zoomValue.slice(0, -1));
        const newZoomValueFloat = Math.max(zoomValueFloat / 2, 1); // Ensure it's at least 1%
        this.zoomValue = this.formatZoomValue(newZoomValueFloat) + '%';
        Jmol.script(this.appletObject, 'zoom OUT');
    }

    formatZoomValue(value: number): string {
        if (value === 12.5) return value.toFixed(1);
        else if (value === 6.25) return value.toFixed(2);
        else return value.toFixed(0);
    }

    handleZoomInput(): void {
        if (!this.zoomValue.endsWith('%')) this.zoomValue = this.zoomValue + '%';

        Jmol.script(this.appletObject, `zoom ${this.zoomValue.slice(0, -1)}`);
    }

    toggleDrag(): void {
        if (!this.toggledDrag) {
            this.toggledDrag = !this.toggledDrag;
            Jmol.script(this.appletObject, 'set picking DRAGSELECTED;');
        } else {
            this.toggledDrag = !this.toggledDrag;
            Jmol.script(this.appletObject, 'set picking ON');
        }
    }
}
