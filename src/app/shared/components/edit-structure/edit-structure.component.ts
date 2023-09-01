import { AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';

declare var Jmol: any;

// Set up JSmol applet configuration
const info = {
    color: '#D6D6D6',
    width: '100%',
    height: '100%',
    use: 'HTML5',
    j2sPath: '../../../../assets/jsmol/j2s',
    serverURL: '../../../../assets/jsmol/php/jsmol.php',
    src: '../../../../assets/1aho.pdb',
};

@Component({
    selector: 'shrd-edit-structure',
    templateUrl: './edit-structure.component.html',
    styleUrls: ['./edit-structure.component.scss'],
})
export class EditStructureComponent implements OnInit, AfterViewInit {
    // TODO: add props for file and can edit

    @ViewChild('appletContainer', { static: false }) appletContainer!: ElementRef;
    private appletElement!: HTMLDivElement;
    private appletObject: any;
    appletHtml!: string;
    private file: any;
    zoomValue: string;

    constructor(private renderer: Renderer2) {
        this.zoomValue = '100%';
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.appletElement = this.appletContainer.nativeElement;

        this.loadJSMolWithPromise()
            .then((appletHtml) => {
                this.appletElement.innerHTML = appletHtml;

                if (this.file) this.loadFile();
                const appletContainer = document.getElementById('jsmolApplet');

                // NOTE: need a delay before setting jmol params or else it won't render
                // setTimeout(() => {
                //     Jmol.script(this.appletObject, 'set disablePopupMenu TRUE');
                // }, 1000);
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

    handleFileUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            this.file = fileInput.files[0];
            console.log(this.file); // Access the selected file
            // Perform further actions with the file (e.g., read its contents, validate, etc.)
            // this.readFileContents(this.file);
        }
    }

    loadFile() {
        // Perform actions to load the uploaded file into JSmol
        // You can access the file reference and pass it to JSmol methods as needed
        // Example: this.jmolApplet.script('load FILE "path/to/file.xyz"');
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;

        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContents = event.target?.result as string;
                console.log('file contents', fileContents + 'END');
                // const fileContentsAppended = `load data "test" ${fileContents} end "test"`;
                const fileContentsAppended = `load data "model" ${fileContents} end "model"`;
                console.log('files appended', fileContentsAppended);
                // Pass the file contents to JSmol for loading
                Jmol.script(this.appletObject, fileContentsAppended);
            };
            reader.readAsText(file);
        }
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
        console.log('enter pressed');
        if (!this.zoomValue.endsWith('%')) this.zoomValue = this.zoomValue + '%';
        console.log('zoomValue', this.zoomValue);

        Jmol.script(this.appletObject, `zoom ${this.zoomValue.slice(0, -1)}`);
    }
}
