'use strict';

(function () {
    
    var displayName = document.querySelector('#display-name');
    var apiUrl = appUrl + '/api/:id';

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var userObject = JSON.parse(data);
        
        if (displayName !== null) {
            displayName.innerHTML = 'Welcome, ' + userObject['displayName'] + '    ' + "<a href='/profile'><button>Profile</button></a>";  
        }
    }));
    
})();