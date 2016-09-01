'use strict';

(function () {
    
    var pollSpc = document.querySelector('#poll-spc');
    var apiUrl = appUrl + '/api/polls';
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
        var pollObject = JSON.parse(data);
        var num = pollObject.length;
        var pollArr = [];
        
        for (var i=num-1; i>=0; i--) {
            if (pollObject[i] !== undefined) {
                var temp = "<div class='pollTab'><a href='" + appUrl + "/" + pollObject[i].pid + "'>" +
                        pollObject[i].pollTitle.title + "</a></div>";
                        
                pollArr.push(temp);
            }
        }
        
        pollSpc.innerHTML = pollArr.join('');
        
    }));
    
})();