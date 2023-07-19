import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { AuthService } from '@auth0/auth0-angular';
import { SharedModule } from '../../shared/shared.module';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    let authServiceSpy: unknown;

    beforeEach(() => {
        authServiceSpy = jest.spyOn(AuthService.prototype, 'loginWithRedirect');

        TestBed.configureTestingModule({
            declarations: [NotFoundComponent],
            imports: [SharedModule],
            providers: [AuthService, { provide: AuthService, useValue: authServiceSpy }],
        });
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
