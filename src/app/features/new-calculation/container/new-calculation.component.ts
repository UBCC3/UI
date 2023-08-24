import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
})
export class NewCalculationComponent implements OnInit {
    form: FormGroup;
    moreSettings: boolean;
    file: any;

    // NOTE: for testdata
    calculationType: any;
    constructor(private formBuilder: FormBuilder) {
        this.moreSettings = false;
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
        // TODO: flag to show more
        this.moreSettings = !this.moreSettings;
        console.log(this.moreSettings);
    }

    handleFileUpload(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            this.file = fileInput.files[0];
            this.form.patchValue({ file: fileInput.files[0] });
            console.log(this.file); // Access the selected file
            // Perform further actions with the file (e.g., read its contents, validate, etc.)
            // this.readFileContents(this.file);
        }
    }

    deleteFile(): void {
        this.form.get('file')?.reset();
    }

    test(): void {
        console.log(this.form.value);
        console.log(this.form.valid);
        // console.log(this.form.get('file')?.value.name);
    }
}