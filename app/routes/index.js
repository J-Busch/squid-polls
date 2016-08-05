'use strict';

var PollHandler = require(process.cwd() + '/app/controllers/pollHandler.server.js');

module.exports = function(app, passport) {
    
    var pollHandler = new PollHandler();
    
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
        
    app.route('/api/polls')
        .get(pollHandler.getAllPolls)
        .post(function (req, res) {
            var title = req.body.title,
                items = req.body.item,
                user = req.user.twitter.id;
            pollHandler.newPoll(req, res, title, items, user);
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
        
    app.route('/:pid')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/poll.html');
        });
    app.route('/poll/:pid')
        .get(function (req, res) {
            var pid = req.params.pid;
            pollHandler.findPollByID(req, res, pid);
        });
};