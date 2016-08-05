'use strict';

(function () {

    var myPolls = document.querySelector('#my-polls');
    var newItem = document.querySelector('#new-item');
    var pollForm = document.querySelector('#poll-form');
    var apiUrl = appUrl + '/api/profile';

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var pollObject = JSON.parse(data);
        var num = pollObject.length;
        var pollArr = [];
        
        for (var i=0; i<=num-1; i++) {
            var temp = "<a href='" + appUrl + "/" + pollObject[i].pid + "'><div class='col-xs-12 pollTab'>" +
                        pollObject[i].pollTitle.title + ' ' + pollObject[i].pollItems[0].item + "</div></a>";
                        
            pollArr.push(temp);
        }
        
        myPolls.innerHTML = pollArr.join('');
        
    }));
    
    newItem.addEventListener('click', function () {
        pollForm.innerHTML += '<label>Next Item</label><input type="text" name="item"></input>';
    });

})();