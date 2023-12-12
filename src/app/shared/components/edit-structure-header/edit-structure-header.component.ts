import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'shrd-edit-structure-header',
    templateUrl: './edit-structure-header.component.html',
    styleUrls: ['./edit-structure-header.component.scss'],
})
export class EditStructureHeaderComponent {
    @Input()
    jobStatus!: string;

    @Input()
    name!: string;

    constructor(private location: Location) {}

    onBackClick(): void {
        this.location.back();
    }
}
