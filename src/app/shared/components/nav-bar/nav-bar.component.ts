import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

    login() {
        this.auth.loginWithRedirect({
            appState: {
                target: '/dashboard',
            },
        });
    }

    logout() {
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
}
