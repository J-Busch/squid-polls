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
        
        for (var i=num-1; i>=0; i--) {
            var temp = "<div class='pollTab'><a href='" + appUrl + "/" + pollObject[i].pid + "'>" +
                        pollObject[i].pollTitle.title + "</a></div>";
                        
            pollArr.push(temp);
        }
        
        myPolls.innerHTML = pollArr.join('');
        
    }));
    
    newItem.addEventListener('click', function () {
        extraItems.innerHTML += "<div class='form-group'><label>Next Item</label><input class='form-control' type='text' name='item' maxlength='30' placeholder='Item' required></input></div>";
    });

})();