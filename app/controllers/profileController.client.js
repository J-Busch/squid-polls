'use strict';

(function () {

    var myPolls = document.querySelector('#my-polls');
    var newItem = document.querySelector('#new-item');
    var extraItems = document.querySelector('#extra-items');
    var apiUrl = appUrl + '/api/profile';

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var pollObject = JSON.parse(data);
        var num = pollObject.length;
        var pollArr = [];
        
        for (var i=0; i<=num-1; i++) {
            var temp = "<a href='" + appUrl + "/" + pollObject[i].pid + "'><div class='col-xs-12 pollTab'>" +
                        pollObject[i].pollTitle.title + "</div></a>";
                        
            pollArr.push(temp);
        }
        
        myPolls.innerHTML = pollArr.join('');
        
    }));
    
    newItem.addEventListener('click', function () {
        extraItems.innerHTML += '<div class="col-xs-3"><h4><label>Next Item</label></h4><input type="text" name="item" maxlength="30" required></input></div>';
    });

})();