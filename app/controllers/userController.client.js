'use strict';

(function () {
    
    var displayName = document.querySelector('#display-name');
    var apiUrl = appUrl + '/api/:id';
    
    function updateHtmlElement (data, element, userProperty) {
        element.innerHTML = data[userProperty];
    }

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var userObject = JSON.parse(data);
        
        updateHtmlElement(userObject, displayName, 'displayName');
        
        if (displayName !== null) {
            displayName.innerHTML = 'Welcome, ' + userObject['displayName'] + "<a href='/profile'><button>Profile</button></a>";  
        }
    }));
    
})();