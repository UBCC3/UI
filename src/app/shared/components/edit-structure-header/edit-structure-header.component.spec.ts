import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStructureHeaderComponent } from './edit-structure-header.component';
import { StatusIconComponent } from '../status-icon/status-icon.component';

describe('EditStructureHeaderComponent', () => {
    let component: EditStructureHeaderComponent;
    let fixture: ComponentFixture<EditStructureHeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EditStructureHeaderComponent, StatusIconComponent],
        });
        fixture = TestBed.createComponent(EditStructureHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
