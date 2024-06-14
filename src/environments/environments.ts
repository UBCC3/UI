export const environment = {
    production: false,
    auth0: {
        // NOTE: get auth0 ids
        domain: process.env["AUTH0_DOMAIN"] || 'DEF_A',
        clientId: process.env["AUTH0_CLIENTID"] || 'DEF_A',
        authorizationParams: {
            redirect_uri: 'http://localhost:4200/callback',
            audience: process.env["AUTH0_AUDIENCE"] || 'DEF_A',
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
