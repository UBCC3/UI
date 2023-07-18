import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    Auth0ClientService,
    AuthClientConfig,
    AuthConfig,
    AuthConfigService,
    AuthGuard,
    AuthModule,
    AuthService,
} from '@auth0/auth0-angular';

@NgModule({
    imports: [],
    exports: [],
})
export class AuthModuleMock {
    /**
     * Mock forRoot method
     * @param config The optional configuration for the SDK.
     */
    static forRoot(config?: AuthConfig): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService,
                AuthGuard,
                {
                    provide: AuthConfigService,
                    useValue: config,
                },
                {
                    provide: Auth0ClientService,
                    useFactory: (): any => {
                        return;
                    },
                    deps: [AuthClientConfig],
                },
            ],
        };
    }
}
