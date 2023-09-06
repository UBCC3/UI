import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusMenuService } from './status-menu.service';

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

    constructor(private service: StatusMenuService) {
        this.statusMenuClick = new EventEmitter<any>();
    }

    onStatusMenuClick(type: string): void {
        // this.statusMenuClick.emit(type);
        // NOTE: maybe move service file from shared to status-menu and have specific emitter for comp
        this.service.emitStatusMenuEvent(type);
    }
}
