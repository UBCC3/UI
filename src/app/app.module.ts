import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        HttpClientModule,
        AuthModule.forRoot({
            domain: 'dev-18wlpvkeky26dv7g.us.auth0.com',
            clientId: 'dPLeUwe5IKuhwMSduPBy9ZbiH88IC6tj',
            authorizationParams: {
                audience: 'https:/test-fast-api.com',
                redirect_uri: window.location.origin,
            },
            httpInterceptor: {
                allowedList: ['http://localhost:8000/*'],
            },
        }),
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
