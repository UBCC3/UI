export const environment = {
    production: false,
    auth0: {
        domain: 'dev-18wlpvkeky26dv7g.us.auth0.com',
        clientId: 'dPLeUwe5IKuhwMSduPBy9ZbiH88IC6tj',
        authorizationParams: {
            redirect_uri: 'http://localhost:4200/callback',
            audience: 'https:/test-fast-api.com',
        },
        errorPath: '/callback',
    },
    api: {
        serverUrl: 'http://localhost:8000',
    },
    httpInterceptor: {
        allowedList: ['http://localhost:8000/*'],
    },
};
