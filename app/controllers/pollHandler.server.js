'use strict';

var Polls = require('../models/polls.js');
var Poll = require('../models/polls.js');

function PollHandler () {
    
    this.makePolls = function (req, res) {
        var poll = new Poll();
        poll.pollTitle.title = "Test Poll";
        poll.pollTitle.author = "Joel Busch";
        poll.pollItems.item = 'Test Item';
        poll.pollItems.voteNbr = 1;
                    
        poll.save(function(err, poll) {
            if (err) throw err;
        });
        
        var poll1 = new Poll();
        poll1.pollTitle.title = "Next Poll";
        poll1.pollTitle.author = "Noah Kreibel";
        poll1.pollItems.item = 'Next Item';
        poll1.pollItems.voteNbr = 2;
                    
        poll1.save(function(err, poll1) {
            if (err) throw err;
        });
        
        var poll2 = new Poll();
        poll2.pollTitle.title = "Last Poll";
        poll2.pollTitle.author = "Lauren Payne";
        poll2.pollItems.item = 'Last Item';
        poll2.pollItems.voteNbr = 3;
                    
        poll2.save(function(err, poll2) {
            if (err) throw err;
        });
    }

    this.getPolls = function (req, res) {
        Polls
            .find({}, function(err, results) {
                if (err) throw err;
                
                if (results) {
                    res.json(results);
                }
            })
    };
    
    this.rmvPolls = function (req, res) {
        Polls
            .remove({}, function (err) {
                if (err) throw err;
            })
    }
}

module.exports = PollHandler;