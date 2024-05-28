export const environment = {
    production: false,
    auth0: {
        // NOTE: get auth0 ids
        domain: process.env["AUTH0_DOMAIN"] || 'DEF_A',
        clientId: process.env["AUTH0_CLIENTID"] || 'DEF_A',
        authorizationParams: {
            redirect_uri: 'http://localhost:4200/callback',
            audience: '',
        },
        errorPath: '/callback',
    },
    api: {
        serverUrl: 'http://ec2-3-99-64-179.ca-central-1.compute.amazonaws.com/api',
    },
    httpInterceptor: {
        allowedList: ['http://ec2-3-99-64-179.ca-central-1.compute.amazonaws.com/api/*'],
    },
};
