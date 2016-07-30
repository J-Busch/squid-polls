'use strict';

var PollHandler = require(process.cwd() + '/app/controllers/pollHandler.server.js');

module.exports = function(app, passport) {
    
    var pollHandler = new PollHandler();
    var currentPoll;
    
    function isLoggedIn (req, res) {
        if (req.isAuthenticated()) {
            return true;
        }
        return false;
    }

    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });
        
    app.route('/profile')
        .get(function (req, res) {
            if (isLoggedIn(req, res)) {
                res.sendFile(process.cwd() + '/public/profile.html');
            }
        });
        
    app.route('/poll/:pid')
        .get(function (req, res) {
            currentPoll = req.params.pid;
            res.sendFile(process.cwd() + '/public/poll.html');
        });
        
    app.route('/api/onePoll')
        .get(function (req, res) {
            pollHandler.getAllPolls(req, res);
        });
        
    app.route('/api/polls')
        .get(pollHandler.getAllPolls)
        .post(function (req, res) {
            var title = req.body.title,
                item1 = req.body.item1,
                item2 = req.body.item2,
                user = req.user.twitter.id;
            pollHandler.newPoll(req, res, title, item1, item2, user);
        })
        .delete(pollHandler.rmvPolls);
        
    app.route('/api/profile')
        .get(function(req, res) {
            var user = req.user.twitter.id;
            pollHandler.findMyPolls(req, res, user);
        });
        
    app.route('/api/:id')
        .get(function (req, res) {
            if (isLoggedIn(req, res)) {
                res.json(req.user.twitter);
            }
        });
        
    app.route('/login-logout')
        .get(function (req, res) {
            if (isLoggedIn(req, res)) {
                req.logout();
                res.redirect('/');
            } else {
                res.redirect('/auth/twitter');
            }
        });
        
    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));
        
    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
};