'use strict';

(function () {
    
    var pollSpc = document.querySelector('#poll-spc');
    var test = document.querySelector('#test');
    var test1 = document.querySelector('#test1');
    var test2 = document.querySelector('#test2');
    var apiUrl = appUrl + '/api/polls';
    
    test.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
            var pollObject = JSON.parse(data);
            var num = pollObject.length
            var thing = [];
            
            for (var i=0; i<=num-1; i++) {
                var temp = "<div class='col-xs-12 pollTab'>" + pollObject[i].pollTitle.title + "</div>";
                thing.push(temp);
            }
            
            pollSpc.innerHTML = thing.join('');
            
            });
    });
    
    test1.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('POST', apiUrl, function() {
            console.log('ayyy');
            });
    });
    
    test2.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('DELETE', apiUrl, function() {
            console.log('yooooooo');
            });
    });
    
})();