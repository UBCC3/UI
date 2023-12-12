import { Inject, Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { loginFlowInitiated, logoutFlowInitiated, setUser, signupFlowInitiated } from '../actions/user.actions';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        @Inject(DOCUMENT) public document: Document
    ) {}

    login$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginFlowInitiated.type),
                tap(() =>
                    this.authService.loginWithRedirect({
                        appState: {
                            target: '/dashboard',
                        },
                    })
                )
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logoutFlowInitiated.type),
                tap(() =>
                    this.authService.logout({
                        logoutParams: {
                            returnTo: this.document.location.origin,
                        },
                    })
                )
            ),
        { dispatch: false }
    );

    signup$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(signupFlowInitiated.type),
                tap(() =>
                    this.authService.loginWithRedirect({
                        appState: {
                            target: '/dashboard',
                        },
                        authorizationParams: {
                            prompt: 'login',
                            screen_hint: 'signup',
                        },
                    })
                )
            ),
        { dispatch: false }
    );

    userChanged$ = createEffect(() => this.authService.user$.pipe(map((user) => setUser({ user: user as User }))));
}
