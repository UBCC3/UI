import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../../shared.module';
import { AuthService } from '@auth0/auth0-angular';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../store';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    let authServiceSpy: unknown;

    beforeEach(() => {
        authServiceSpy = jest.spyOn(AuthService.prototype, 'loginWithRedirect');

        TestBed.configureTestingModule({
            declarations: [LayoutComponent],
            imports: [SharedModule, StoreModule.forRoot(reducers)],
            providers: [AuthService, { provide: AuthService, useValue: authServiceSpy }],
        }).compileComponents();
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
