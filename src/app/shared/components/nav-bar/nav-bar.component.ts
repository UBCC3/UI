import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store, select } from '@ngrx/store';
import { loginFlowInitiated, logoutFlowInitiated, signupFlowInitiated } from '../../../store/actions/user.actions';
import { selectUser } from '../../../store/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    user$!: Observable<User | undefined>;
    constructor(public auth: AuthService, public store: Store, public router: Router) {
        this.user$ = this.store.pipe(select(selectUser));
    }
    handleLogin() {
        this.store.dispatch(loginFlowInitiated());
    }

    handleLogout() {
        this.store.dispatch(logoutFlowInitiated());
    }

    handleSignUp(): void {
        this.store.dispatch(signupFlowInitiated());
    }

    onLogoClick(): void {
        this.auth.isAuthenticated$.subscribe((res) =>
            res ? this.router.navigate(['/dashboard']) : this.router.navigate(['/'])
        );
    }
}
