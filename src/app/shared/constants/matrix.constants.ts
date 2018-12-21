export const MatrixConstants = Object.freeze({
    commonTerms: {
        currentUser: 'tech-masterpiece-matrix-current-user'
    },
    route: {
        home: 'home',
        contacts: 'contacts',
        moi: 'moi',
        memoryQuotes: 'memory-quotes',
        poc: 'poc',
        error404: '404',

        memQuoMemoryQuoteEntry: 'memory-quote-entry',

        pocLanding: 'landing',
    },
    url: {
        apiUrl: 'http://localhost/matrix-agents/',
        authenticationUrl: 'authentication/authenticate-user.php',
        getContactListUrl: 'modules/contacts/getContacts.php',
        loginUrl: '/login',
        registrationUrl: 'authentication/register-user.php',
        signOutUrl: 'authentication/sign-out.php',
        getQuoteToMemoryListApiUrl: 'http://localhost/matrix/assets/data/quote-to-memory-module/quote-to-memory-list-response-sample.json'
    },
    messages: {
        registrationSuccess: 'Registration successful',
    },
    values: {
        returnUrlParamKey: 'returnUrl',
    }
});
