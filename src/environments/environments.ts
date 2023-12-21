export const environment = {
    production: false,
    auth0: {
        // NOTE: get auth0 ids
        domain: '',
        clientId: '',
        authorizationParams: {
            redirect_uri: 'http://localhost:4200/callback',
            audience: '',
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
