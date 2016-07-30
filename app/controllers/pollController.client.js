'use strict';

(function () {
    
    var pollSpc = document.querySelector('#poll-spc');
    var test2 = document.querySelector('#test2');
    var apiUrl = appUrl + '/api/polls';
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
        var pollObject = JSON.parse(data);
        var num = pollObject.length;
        var pollArr = [];
        
        for (var i=0; i<=num-1; i++) {
            var temp = "<a href='" + appUrl + "/poll/" + pollObject[i].pid + "'><div class='col-xs-12 pollTab'>" +
                        pollObject[i].pollTitle.title + ' ' + pollObject[i].pid + "</div></a>";
                        
            pollArr.push(temp);
        }
        
        pollSpc.innerHTML = pollArr.join('');
        
    }));
    
    test2.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('DELETE', apiUrl, function() {
            console.log('yooooooo');
            });
    });
})();