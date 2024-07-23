import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService, User } from '@auth0/auth0-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, of, throwError, filter } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {
    loginFlowInitiated,
    logoutFlowInitiated,
    setUser,
    signupFlowInitiated,
    userAuthenticated,
} from '../actions/user.actions';
import { environment } from '../../../environments/environments';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private http: HttpClient,
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

    handleUserAuthenticated$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userAuthenticated),
                switchMap(() =>
                    this.authService.user$.pipe(
                        filter((user) => !!user),
                        switchMap((user) => {
                            const email = user?.email;
                            if (!email) return throwError(() => new Error('User email is not available'));
                            return this.http
                                .get<boolean>(`${environment.api.serverUrl}/users/user-exists?email=${email}`)
                                .pipe(
                                    switchMap((exists) =>
                                        exists
                                            ? this.http.patch(`${environment.api.serverUrl}/users/`, {
                                                  email,
                                                  lastlogin: new Date(),
                                              })
                                            : this.http.post(`${environment.api.serverUrl}/users/`, {
                                                  email,
                                              })
                                    )
                                );
                        }),
                        catchError((error) => {
                            console.error('Error syncing user data', error);
                            return of({ error });
                        })
                    )
                )
            ),
        { dispatch: false }
    );
}
