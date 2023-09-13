import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectUser } from '../../../store/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent implements OnInit {
    responseJson!: string;
    hasApiError = false;

    user$!: Observable<User | undefined>;

    constructor(public auth: AuthService, public http: HttpClient, public store: Store<AppState>) {}

    ngOnInit() {
        this.user$ = this.store.pipe(select(selectUser));
        this.user$.subscribe((res) => console.log('user', res));
        this.auth.getAccessTokenSilently().subscribe((token) => console.log('token', token));
    }

    testApi() {
        this.http.get('http://localhost:8000/api/private').subscribe({
            next: (res) => {
                this.hasApiError = false;
                this.responseJson = JSON.stringify(res, null, 2).trim();
                console.log('res', this.responseJson);
            },
            error: () => (this.hasApiError = true),
        });
    }

    testPost() {
        this.http
            .post('http://localhost:8000/api/private', { name: 'test name', content: 'some text for content' })
            .subscribe({
                next: (res) => {
                    this.hasApiError = false;
                    this.responseJson = JSON.stringify(res, null, 2).trim();
                    console.log('res', this.responseJson);
                },
                error: () => (this.hasApiError = true),
            });
    }
}
