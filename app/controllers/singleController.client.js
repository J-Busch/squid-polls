'use strict';

(function () {
    
    var twister = document.querySelector('#twister');
    var delBtn;
    var addBtn;
    var userBtns = document.querySelector('#user-btns');
    var pollAuthor = document.querySelector('#author');
    var content = document.querySelector('.poll');
    
    var temp = window.location;
    var pid = String(temp).slice(-1);
    var apiUrl = appUrl + '/poll/' + pid;
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var singlePoll = JSON.parse(data);
        
        ajaxFunctions.ajaxRequest('GET', appUrl + '/api/:id', function(data2) {
            var user = JSON.parse(data2);
            
            if (user['username'] === singlePoll.pollTitle.author) {
                userBtns.innerHTML = "<form action='poll/" + pid + "' method='post'><input type='text' name='item'></input><button id='add-btn' type='submit'>Add Item</button></form>"
                + "<button id='del-btn'>Delete This Poll</button>";
            }
            delBtn = document.querySelector('#del-btn');
            addBtn = document.querySelector('#add-btn');
            
            delBtn.addEventListener('click', function () {
                ajaxFunctions.ajaxRequest('DELETE', apiUrl, function() {});
                content.innerHTML = 'Poll has been deleted...  =)';
            });
        });
        
        google.charts.setOnLoadCallback(drawChart(singlePoll));
        pollAuthor.innerHTML = 'Poll by:  ' + singlePoll.pollTitle.author;
    }));
    
    
    twister.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
            var singlePoll = JSON.parse(data);
        
            window.open('https://twitter.com/intent/tweet?related=freecodecamp&text=' + encodeURIComponent(
                singlePoll.pollTitle.title + ' ' + appUrl + '/' + pid
                ), 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
        });
    });
    
    function drawChart(singlePoll) {
        var items = [['Item', 'Votes']];
        for (var i=0; i<singlePoll.pollItems.length; i++) {
            items.push([singlePoll.pollItems[i].item, singlePoll.pollItems[i].voteNbr])
        }
        
        var data = google.visualization.arrayToDataTable(items);
        var options = {
            title: singlePoll.pollTitle.title,
        };
        
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        
        chart.draw(data, options);
    }
    
})();