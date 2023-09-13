import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardContainerComponent } from './dashboard-container.component';
import { AuthService } from '@auth0/auth0-angular';
import { SharedModule } from '../../../shared/shared.module';
import { BehaviorSubject, of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../store';

describe('DashboardContainerComponent', () => {
    let component: DashboardContainerComponent;
    let fixture: ComponentFixture<DashboardContainerComponent>;

    beforeEach(() => {
        const authMock = {
            user$: new BehaviorSubject<any>(null),
            getAccessTokenSilently: jest.fn().mockReturnValue(of('abc')),
        };
        TestBed.configureTestingModule({
            declarations: [DashboardContainerComponent],
            imports: [HttpClientTestingModule, SharedModule, StoreModule.forRoot(reducers)],
            providers: [AuthService, { provide: AuthService, useValue: authMock }],
        }).compileComponents();
        fixture = TestBed.createComponent(DashboardContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
