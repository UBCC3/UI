export const environment = {
    production: false,
    auth0: {
        // NOTE: get auth0 ids
        domain: 'dev-18wlpvkeky26dv7g.us.auth0.com',
        clientId: 'dPLeUwe5IKuhwMSduPBy9ZbiH88IC6tj',
        authorizationParams: {
            redirect_uri: 'http://localhost:4200/callback',
            audience: 'https://dev-18wlpvkeky26dv7g.us.auth0.com/api/v2/',
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
