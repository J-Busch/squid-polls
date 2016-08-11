'use strict';

(function () {
    
    var pollSpc = document.querySelector('#poll-spc');
    var apiUrl = appUrl + '/api/polls';
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
        var pollObject = JSON.parse(data);
        var num = pollObject.length;
        var pollArr = [];
        
        for (var i=num; i>0; i--) {
            var temp = "<a href='" + appUrl + "/" + pollObject[i].pid + "'><div class='col-xs-12 pollTab'>" +
                        pollObject[i].pollTitle.title + "</div></a>";
                        
            pollArr.push(temp);
        }
        
        pollSpc.innerHTML = pollArr.join('');
        
    }));
    
})();