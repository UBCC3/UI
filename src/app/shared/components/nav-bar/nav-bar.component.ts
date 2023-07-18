import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public router: Router) {}

    handleLogin() {
        this.auth.loginWithRedirect({
            appState: {
                target: '/dashboard',
            },
        });
    }

    handleLogout() {
        this.auth.logout({
            logoutParams: {
                returnTo: this.document.location.origin,
            },
        });
    }

    handleSignUp(): void {
        this.auth.loginWithRedirect({
            appState: {
                target: '/dashboard',
            },
            authorizationParams: {
                prompt: 'login',
                screen_hint: 'signup',
            },
        });
    }

    onLogoClick(): void {
        this.auth.isAuthenticated$.subscribe((res) =>
            res ? this.router.navigate(['/dashboard']) : this.router.navigate(['/'])
        );
    }
}
