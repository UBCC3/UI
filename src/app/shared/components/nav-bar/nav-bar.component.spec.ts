import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { NavBarComponent } from './nav-bar.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../store';

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;

    let authServiceSpy: unknown;

    beforeEach(() => {
        authServiceSpy = jest.spyOn(AuthService.prototype, 'loginWithRedirect');

        TestBed.configureTestingModule({
            declarations: [NavBarComponent],
            imports: [StoreModule.forRoot(reducers)],
            providers: [AuthService, { provide: AuthService, useValue: authServiceSpy }],
        }).compileComponents();
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
