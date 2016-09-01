'use strict';

(function () {
    
    var displayName = document.querySelector('#display-name');
    var log = document.querySelector('#log');
    var apiUrl = appUrl + '/api/:id';

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var userObject = JSON.parse(data);
        
        displayName.innerHTML = "<a href='/profile'>" + userObject['displayName'] + "</a>";
        log.innerHTML = "<a href='/login-logout'><i class='fa fa-twitter' aria-hidden='true'></i> Logout</a>";
        
    }));
    
    log.innerHTML = "<a href='/login-logout'><i class='fa fa-twitter' aria-hidden='true'></i> Login</a>";
    
})();