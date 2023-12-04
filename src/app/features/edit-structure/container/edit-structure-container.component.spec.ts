import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStructureContainerComponent } from './edit-structure-container.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

describe('EditStructureContainerComponent', () => {
    let component: EditStructureContainerComponent;
    let fixture: ComponentFixture<EditStructureContainerComponent>;
    let mockActivatedRoute;
    let routerSpy;

    beforeEach(() => {
        const mockFile = 'testFile';
        const mockHistoryState = { file: mockFile };
        mockActivatedRoute = {
            paramMap: of({
                get: jest.fn().mockReturnValue(mockFile),
            }),
            snapshot: {
                data: {
                    file: mockFile,
                },
            },
        };

        routerSpy = {
            navigate: jest.fn(),
        };

        TestBed.configureTestingModule({
            declarations: [EditStructureContainerComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Router, useValue: routerSpy },
            ],
            imports: [SharedModule],
        });
        fixture = TestBed.createComponent(EditStructureContainerComponent);
        component = fixture.componentInstance;
        jest.spyOn(window.history, 'state', 'get').mockReturnValue(mockHistoryState);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
