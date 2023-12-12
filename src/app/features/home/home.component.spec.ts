import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '@auth0/auth0-angular';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    let authServiceSpy: unknown;

    beforeEach(() => {
        authServiceSpy = jest.spyOn(AuthService.prototype, 'loginWithRedirect');

        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [SharedModule, StoreModule.forRoot(reducers)],
            providers: [AuthService, { provide: AuthService, useValue: authServiceSpy }],
        }).compileComponents();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
