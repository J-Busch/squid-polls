'use strict';

(function () {
    
    var twister = document.querySelector('#twister');
    var delBtn;
    var addItem = document.querySelector('#add-item');
    var userBtns = document.querySelector('#user-btns');
    var voteForm = document.querySelector('#vote-form');
    var pollTitle = document.querySelector('#title');
    var content = document.querySelector('.content');
    
    var temp = String(window.location);
    var diff = (temp.indexOf('/', 9) + 1) - temp.length;
    var pid = temp.slice(diff);
    var apiUrl = appUrl + '/poll/' + pid;
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var singlePoll = JSON.parse(data);
        
        google.charts.setOnLoadCallback(drawChart(singlePoll));
        
        ajaxFunctions.ajaxRequest('GET', appUrl + '/api/:id', function(data2) {
            var user = JSON.parse(data2);
            
            if (user['username'] === singlePoll.pollTitle.author) {
                userBtns.innerHTML = "<h4><button id='del-btn'>Delete Poll</button></h4>";
                addItem.innerHTML = "<form action='poll/" + pid + "' method='post'><div class='col-xs-6'><input type='text' name='item' maxlength='30'></input></div><div class='col-xs-6'><h4><button type='submit'>Add Item</button></h4></div></form>";
            }
            
            var voted = false;
            if (user !== null) {
                for (var i=0; i<singlePoll.userVotes.length; i++) {
                    if (singlePoll.userVotes[i].user === user['username']) {
                        voted = true;
                    }
                }
                
                if (voted === false) {
                    var arr = ["<form action='pollv2/" + pid + "' method='post'><h4>"];
                    for (var i=0; i<singlePoll.pollItems.length; i++) {
                        arr.push("<input type='radio' name='item' value='" + singlePoll.pollItems[i].item + "'> " + singlePoll.pollItems[i].item + "   </input>");
                    }
                    arr.push("<button type='submit'>Vote!</button></h4></form>");
        
                    voteForm.innerHTML = arr.join('');
                }
            }
            
            delBtn = document.querySelector('#del-btn');
            
            delBtn.addEventListener('click', function () {
                ajaxFunctions.ajaxRequest('DELETE', apiUrl, function() {});
                content.innerHTML = '<h2 class="polls">Poll has been deleted...  =(</h2>';
            });
        });
        
        pollTitle.innerHTML = '<h1>' + singlePoll.pollTitle.title + '</h1><h4>By: ' + singlePoll.pollTitle.author + '</h4>';
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
            items.push([singlePoll.pollItems[i].item, singlePoll.pollItems[i].voteNbr]);
        }
        
        var data = google.visualization.arrayToDataTable(items);
        var options = {
            'height' :300
        };
        
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        
        chart.draw(data, options);
    }
    
})();