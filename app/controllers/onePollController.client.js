'use strict';

(function () {
    
    var pollInfo = document.querySelector('#poll-info');
    var apiUrl = appUrl + '/api/onePoll';

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var pollObject = JSON.parse(data);
        
        pollInfo.innerHTML = pollObject;
    }));
    
})();