import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, AUTO_STYLE } from '@angular/animations';
import { NavigationExtras, Router } from '@angular/router';

const calculationType = [
    {
        id: 1,
        name: 'Geometry Optimization',
    },
    {
        id: 2,
        name: 'Natural Bond Orbitals',
    },
];

@Component({
    selector: 'app-new-calculation',
    templateUrl: './new-calculation.component.html',
    styleUrls: ['./new-calculation.component.scss'],
    animations: [
        trigger('collapse', [
            state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
            state('true', style({ height: '0', visibility: 'hidden' })),
            transition('false => true', animate(100 + 'ms ease-in')),
            transition('true => false', animate(100 + 'ms ease-out')),
        ]),
    ],
})
export class NewCalculationComponent implements OnInit {
    form: FormGroup;
    moreSettings: boolean;
    file!: File | null;
    isEditStructure: boolean;
    extensionError!: string;

    // NOTE: for testdata
    calculationType: any;

    smallJsMolContainer = {
        width: '500px',
        height: '360px',
    };
    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.moreSettings = false;
        this.isEditStructure = false;
        this.calculationType = calculationType;
        this.form = this.formBuilder.group({
            calculationName: new FormControl(null, [Validators.required.bind(this)]),
            calculationType: new FormControl(null, [Validators.required.bind(this)]),
            theory: new FormControl(null, [Validators.required.bind(this)]),
            basisSet: new FormControl(null, [Validators.required.bind(this)]),
            file: new FormControl(null), //NOTE: is file required?
            solventEffects: new FormControl(null),
            waveTheory: new FormControl(null),
        });
    }

    ngOnInit(): void {
        console.log(this.moreSettings);
    }

    moreSettingsClick(): void {
        this.moreSettings = !this.moreSettings;
        console.log(this.moreSettings);
    }

    handleFileUpload(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            // const selectedFile = fileInput.files[0];
            this.file = fileInput.files[0];
            const allowedExtensions = ['xyz', 'pdb', 'cif', 'mol'];
            const fileExtension = this.file.name.split('.').pop()?.toLowerCase();

            if (allowedExtensions.includes(fileExtension as string)) {
                // The selected file has a valid extension
                this.form.patchValue({ file: fileInput.files[0] });
                this.extensionError = '';
            } else {
                // The selected file has an invalid extension
                this.file = null; // Reset selectedFile to null
                this.deleteFile(); // Reset file in form
                this.extensionError = 'Invalid file extension. Allowed extensions: ' + allowedExtensions.join(', ');
                console.error('Invalid file extension. Allowed extensions:', allowedExtensions.join(', '));
            }
        }
    }

    deleteFile(): void {
        this.form.get('file')?.reset();
    }

    editStructure(): void {
        const navExtras: NavigationExtras = {
            state: {
                file: this.file,
            },
        };

        this.router.navigate(['profile'], navExtras);
    }

    calculate(): void {
        // TODO: call to backend to calculate
        console.log(this.form.value);
        console.log(this.form.valid);
    }
}
