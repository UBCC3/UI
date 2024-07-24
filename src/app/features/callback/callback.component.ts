import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { userAuthenticated } from '../../store/actions/user.actions';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
    error$ = this.auth.error$;

    constructor(public auth: AuthService, private router: Router, private store: Store) {}

    ngOnInit() {
        this.auth.isAuthenticated$.subscribe({
            next: (isAuthenticated) => {
                if (isAuthenticated) {
                    this.store.dispatch(userAuthenticated());
                } else {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                this.error$ = of(err);
                this.router.navigate(['/**']);
            },
        });
    }
}
