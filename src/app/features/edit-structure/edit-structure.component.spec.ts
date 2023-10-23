import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStructureComponent } from './edit-structure.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('EditStructureComponent', () => {
    let component: EditStructureComponent;
    let fixture: ComponentFixture<EditStructureComponent>;
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
            declarations: [EditStructureComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Router, useValue: routerSpy },
            ],
        });
        fixture = TestBed.createComponent(EditStructureComponent);
        component = fixture.componentInstance;
        jest.spyOn(window.history, 'state', 'get').mockReturnValue(mockHistoryState);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
