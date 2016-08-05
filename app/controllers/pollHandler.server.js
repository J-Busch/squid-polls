'use strict';

var Polls = require('../models/polls.js');
var Poll = require('../models/polls.js');

function PollHandler () {
    
    var count = 0;

    this.getAllPolls = function (req, res) {
        Polls
            .find({}, function(err, results) {
                if (err) throw err;
                
                if (results) {
                    res.json(results);
                }
            });
    };
    
    this.findPollByID = function(req, res, pid) {
        Polls
            .findOne({'pid' : pid}, {_id : false}, function(err, results) {
                if (err) throw err;
                
                res.json(results);
            });
    };
    
    this.rmvPolls = function (req, res) {
        Polls
            .remove({}, function (err) {
                if (err) throw err;
            });
    };
    
    this.newPoll = function (req, res, title, items, user) {
        var poll = new Poll();
        var pollItems = [];
        var temp = String(items).split(',');
        for (var i=0; i<temp.length; i++) {
            pollItems.push({item: temp[i], voteNbr: 0});
        }
        poll.pollTitle.title = title;
        poll.pollTitle.author = user;
        poll.pollItems = pollItems;
        poll.pid = count;
        
        poll.save(function(err, poll) {
            if (err) throw err;
        });
        
        count++;
        
        res.redirect('/profile');
    }
    
    this.findMyPolls = function (req, res, user) {
        Polls
            .find({'pollTitle.author' : user}, function(err, results) {
                if (err) return err;
                
                res.json(results);
            });
    };
}

module.exports = PollHandler;