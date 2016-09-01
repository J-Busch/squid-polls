'use strict';

var Polls = require('../models/polls.js');
var Poll = require('../models/polls.js');

function PollHandler () {

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
    
    this.rmvPollByID = function (req, res, pid) {
        Polls
            .remove({'pid' : pid}, function (err) {
                if (err) throw err;
            });
    };
    
    this.addItemByID = function (req, res, pid, item) {
        Polls
            .findOne({'pid' : pid}, function(err, poll) {
                if (err) throw err;
                
                poll.pollItems.push({item: item, voteNbr: 0});
                poll.save(function(err, poll) {
                    if (err) throw err;
                });
            });
            
            res.redirect('/' + pid);
    };
    
    this.addVote = function (req, res, pid, item, user) {
        Polls
            .findOne({'pid' : pid}, function(err, poll) {
                if (err) throw err;
                
                for (var i=0; i<poll.pollItems.length; i++) {
                    if (poll.pollItems[i].item === item) {
                        poll.pollItems[i].voteNbr += 1;
                        poll.userVotes.push({user: user});
                        poll.save(function(err, poll) {
                            if (err) throw err;
                        });
                        res.redirect('/' + pid);
                    }
                }
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
        
        Polls.find({}, {pid : true, _id : false}).sort({pid : -1}).limit(1).exec(function (err, result) {
            if (err) throw err;

            poll.pid = result[0].pid + 1;
            poll.save(function(err, poll) {
                if (err) throw err;
            });
        });
        
        res.redirect('/profile');
    };
    
    this.findMyPolls = function (req, res, user) {
        Polls
            .find({'pollTitle.author' : user}, function(err, results) {
                if (err) return err;
                
                res.json(results);
            });
    };
}

module.exports = PollHandler;