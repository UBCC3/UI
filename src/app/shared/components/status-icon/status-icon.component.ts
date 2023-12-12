import { Component, Input } from '@angular/core';

@Component({
    selector: 'shrd-status-icon',
    templateUrl: './status-icon.component.html',
    styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent {
    @Input()
    status!: string;
}
