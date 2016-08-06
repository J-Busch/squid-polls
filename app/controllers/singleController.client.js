'use strict';

(function () {
    
    
    
    var temp = window.location;
    var pid = String(temp).slice(-1);
    var apiUrl = appUrl + '/poll/' + pid;
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var singlePoll = JSON.parse(data);
        
        google.charts.setOnLoadCallback(drawChart(singlePoll));
    }));
    
    function drawChart(singlePoll) {
        var items = [['Item', 'Votes']];
        for (var i=0; i<singlePoll.pollItems.length; i++) {
            items.push([singlePoll.pollItems[i].item, singlePoll.pollItems[i].voteNbr])
        }
        
        var data = google.visualization.arrayToDataTable(items);
        var options = {
            title: singlePoll.pollTitle.title
        };
        
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        
        chart.draw(data, options);
    }
    
})();