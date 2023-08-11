import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'shrd-status-menu',
    templateUrl: './status-menu.component.html',
    styleUrls: ['./status-menu.component.scss'],
})
export class StatusMenuComponent {
    @Input()
    status!: string;

    @Output()
    statusMenuClick: EventEmitter<any>;

    constructor() {
        this.statusMenuClick = new EventEmitter<any>();
    }

    onStatusMenuClick(type: string): void {
        this.statusMenuClick.emit(type);
    }
}
