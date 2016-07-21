'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');
var PollHandler = require(process.cwd() + '/app/controllers/pollHandler.server.js');

module.exports = function(app, passport) {
    
    var clickHandler = new ClickHandler();
    var pollHandler = new PollHandler();
    
    function sendUserData (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
    }
    
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
        
    app.route('/login-logout')
        .get(function (req, res) {
            if (isLoggedIn(req, res)) {
                req.logout();
                res.redirect('/');
            } else {
                res.redirect('/auth/twitter');
            }
        });
        
    app.route('/profile')
        .get(function (req, res) {
            if (isLoggedIn(req, res)) {
                res.sendFile(process.cwd() + '/public/profile.html');
            }
        });
        
    app.route('/poll')
        .get(function (req, res) {
                res.sendFile(process.cwd() + '/public/poll.html');
        });
        
    app.route('/api/polls')
        .get(pollHandler.getPolls)
        .post(pollHandler.makePolls)
        .delete(pollHandler.rmvPolls);
        
    app.route('/api/:id')
        .get(function (req, res) {
            if (isLoggedIn(req, res)) {
                res.json(req.user.twitter);
            }
        });
        
    app.route('/api/:id/clicks')
        .get(sendUserData, clickHandler.getClicks)
        .post(sendUserData, clickHandler.addClick)
        .delete(sendUserData, clickHandler.resetClicks);
        
    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));
        
    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
};