import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environments';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        HttpClientModule,
        AuthModule.forRoot({
            ...environment.auth0,
            httpInterceptor: {
                ...environment.httpInterceptor,
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
