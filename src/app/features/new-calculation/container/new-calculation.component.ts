import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, AUTO_STYLE } from '@angular/animations';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { CalculationOption } from '../../../shared/models/calculation-option.model';
import { AppState } from '../../../store';
import { Store, select } from '@ngrx/store';
import {
    selectAvailableBasisSets,
    selectAvailableBasisSetsAreLoaded,
    selectAvailableCalculations,
    selectAvailableCalculationsAreLoaded,
    selectAvailableMethods,
    selectAvailableMethodsAreLoaded,
    selectNewCalculationForm,
} from '../../../store/selectors/calculation-management.selectors';
import {
    loadAvailableBasisSets,
    loadAvailableCalculations,
    loadAvailableMethods,
    resetNewCalculationForm,
    setNewCalculationForm,
} from '../../../store/actions/calculation-management.actions';
import { SourceEnum } from '../../../shared/models/source.enum';
import { selectUserEmail } from '../../../store/selectors/user.selectors';
import { postNewJob, setNewJobIsSubmitting } from '../../../store/actions/job.actions';
import { NewJobDTO } from '../../../shared/models/jobs.model';
import { selectNewJobIsSubmitting } from '../../../store/selectors/in-progress-job.selectors';

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

    calculationTypes!: CalculationOption[] | null;
    basisSets!: CalculationOption[] | null;
    methods!: CalculationOption[] | null;
    email!: string | undefined;
    availableCalculationsAreLoaded$!: Observable<boolean>;
    availableBasisSetsAreLoaded$!: Observable<boolean>;
    availableMethodsLoaded$!: Observable<boolean>;

    dataIsLoaded$!: Observable<boolean>;
    newJobIsSubmitting$!: Observable<boolean>;

    smallJsMolContainer = {
        width: '500px',
        height: '360px',
    };

    private subscriptions: Subscription;
    constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) {
        this.subscriptions = new Subscription();
        this.moreSettings = false;
        this.isEditStructure = false;
        this.form = this.formBuilder.group({
            calculationName: new FormControl(null, [Validators.required.bind(this)]),
            calculation: new FormControl(null, [Validators.required.bind(this)]),
            theory: new FormControl(null, [Validators.required.bind(this)]),
            basisSet: new FormControl(null, [Validators.required.bind(this)]),
            file: new FormControl(null, [Validators.required.bind(this)]),
            source: new FormControl(null),
            solventEffects: new FormControl(null),
            waveTheory: new FormControl(null),
        });
    }

    ngOnInit(): void {
        // Dispatch the action to fetch data only if it's not available in the state
        this.store.dispatch(loadAvailableCalculations());
        this.store.dispatch(loadAvailableBasisSets());
        this.store.dispatch(loadAvailableMethods());

        this.dataIsLoaded$ = combineLatest([
            this.store.pipe(select(selectAvailableCalculationsAreLoaded)),
            this.store.pipe(select(selectAvailableBasisSetsAreLoaded)),
            this.store.pipe(select(selectAvailableMethodsAreLoaded)),
        ]).pipe(
            map(([calculationsAreLoaded, basisSetsAreLoaded, methodsAreLoaded]) => {
                return calculationsAreLoaded && basisSetsAreLoaded && methodsAreLoaded;
            })
        );

        this.newJobIsSubmitting$ = this.store.select(selectNewJobIsSubmitting);

        combineLatest([
            this.store.select(selectAvailableCalculations),
            this.store.select(selectAvailableBasisSets),
            this.store.select(selectAvailableMethods),
            this.store.select(selectUserEmail),
        ]).subscribe(([calculationTypes, basisSets, methods, email]) => {
            this.calculationTypes = calculationTypes;
            this.basisSets = basisSets;
            this.methods = methods;
            this.email = email;
        });

        this.store.pipe(select(selectNewCalculationForm)).subscribe((res) => {
            if (res) {
                this.form.patchValue({ ...res });
            }
        });

        // NOTE: set default value for drop down options
        // this.store.select(selectAvailableCalculations).subscribe((data) => {
        //     this.calculationType = data;
        //     if (this.calculationType) {
        //         this.form.patchValue({ calculationType: this.calculationType[0].name });
        //     }
        // });
    }

    moreSettingsClick(): void {
        this.moreSettings = !this.moreSettings;
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
                this.form.patchValue({ file: fileInput.files[0], source: SourceEnum.UPLOADED });
                this.extensionError = '';
            } else {
                // The selected file has an invalid extension
                this.file = null; // Reset selectedFile to null
                this.deleteFile(); // Reset file in form
                this.extensionError = 'Invalid file extension. Allowed extensions: ' + allowedExtensions.join(', ');
                // console.error('Invalid file extension. Allowed extensions:', allowedExtensions.join(', '));
            }
        }
    }

    deleteFile(): void {
        this.form.get('file')?.reset();
    }

    editStructure(): void {
        console.log('form value', this.form.get('file')?.value);
        const navExtras: NavigationExtras = {
            state: {
                file: this.file,
            },
        };

        this.store.dispatch(setNewCalculationForm({ newCalculationForm: this.form.value }));
        this.router.navigate(['edit-structure'], navExtras);
    }

    calculate(): void {
        const keysToDestructure = ['calculationName', 'file'];
        const filteredKeys = Object.keys(this.form.value).filter((key) => !keysToDestructure.includes(key));
        const filteredValues = filteredKeys.map((key) => this.form.value[key]);

        const parameters: { [key: string]: string } = {};
        filteredKeys.forEach((key, index) => {
            parameters[key] = filteredValues[index];
        });

        const dto: NewJobDTO = {
            email: this.email as string,
            job_name: this.form.get('calculationName')?.value,
            parameters,
            file: this.form.get('file')?.value,
        };

        this.store.dispatch(setNewJobIsSubmitting());
        this.store.dispatch(postNewJob({ jobDetail: dto }));
        this.store.dispatch(resetNewCalculationForm());
    }
}
