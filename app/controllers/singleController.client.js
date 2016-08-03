'use strict';

(function () {
    
    var pollInfo = document.querySelector('#single');
    
    var temp = window.location;
    var pid = String(temp).slice(-1);
    var apiUrl = appUrl + '/poll/' + pid;
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var singlePoll = JSON.parse(data);
        
        pollInfo.innerHTML = singlePoll.pollTitle.title;
    }));
    
})();