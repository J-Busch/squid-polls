'use strict';

(function () {

    var myPolls = document.querySelector('#my-polls');
    var apiUrl = appUrl + '/api/profile';

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var pollObject = JSON.parse(data);
        var num = pollObject.length;
        var pollArr = [];
        
        for (var i=0; i<=num-1; i++) {
            var temp = "<a href='" + appUrl + "/poll/" + pollObject[i].pid + "'><div class='col-xs-12 pollTab'>" +
                        pollObject[i].pollTitle.title + ' ' + pollObject[i].pollItems[0].item + ' ' + pollObject[i].pollItems[1].item + "</div></a>";
                        
            pollArr.push(temp);
        }
        
        myPolls.innerHTML = pollArr.join('');
    }));

})();