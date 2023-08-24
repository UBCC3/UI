import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMenuComponent } from './status-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StatusMenuComponent', () => {
    let component: StatusMenuComponent;
    let fixture: ComponentFixture<StatusMenuComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StatusMenuComponent],
            imports: [FormsModule, ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(StatusMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit custom event when button is clicked', () => {
        component.status = 'running';
        const emittedData = 'cancel';
        let receivedData: string | undefined;
        jest.spyOn(component, 'onStatusMenuClick');

        fixture.detectChanges();
        component.statusMenuClick.subscribe((data: string) => {
            receivedData = data;
        });

        const menuItem = fixture.nativeElement.querySelector('li span');
        menuItem.click();

        fixture.detectChanges();

        expect(receivedData).toBe(emittedData);
        expect(component.onStatusMenuClick).toHaveBeenCalledWith('cancel');
    });
});
