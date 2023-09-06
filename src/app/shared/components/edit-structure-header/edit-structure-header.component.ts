import { Component, EventEmitter, Input, Output } from '@angular/core';

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

    @Output()
    backEvent: EventEmitter<any>;
    constructor() {
        this.backEvent = new EventEmitter();
    }

    onBackClick(): void {
        console.log('back clicked');
    }
}
