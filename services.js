dynamicallyLoadScript(
    'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js'
);

function dynamicallyLoadScript(url) {
    var script = document.createElement('script');
    script.src = url;

    document.head.appendChild(script);
}

function baseApiCall(settings, success, fail) {
    const apiCall = $.ajax(settings);

    apiCall.done(success);

    apiCall.fail(fail);
}

const baseUrl = 'https://ltl.ngrok.io';

function isUserLoggedIn(success, fail) {
    var settings = {
        url: baseUrl + '/user',
        method: 'GET',
        timeout: 0,
        headers: {
            Authorization: Cookies.get('auth_token'),
        },
    };

    baseApiCall(settings, success, fail);
}

function getServices(success, fail) {
    var settings = {
        url: baseUrl + '/service',
        method: 'GET',
        timeout: 0,
        headers: {
            Authorization: Cookies.get('auth_token'),
        },
    };

    baseApiCall(settings, success, fail);
}

function createService(data, success, fail) {
    var settings = {
        url: baseUrl + '/service',
        method: 'POST',
        timeout: 0,
        headers: {
            Authorization: Cookies.get('auth_token'),
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    };
    baseApiCall(settings, success, fail);
}
