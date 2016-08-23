'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    passport.use(new TwitterStrategy({
        consumerKey: 'U4uLQAbsqskyWd6TxRbdeE5bF',
        consumerSecret: 'kCzT0B14Z87SWSDpAI55vF25Wp3r1mCWxaPbjwl1ccoBSygmrg',
        callbackURL: configAuth.twitterAuth.callbackURL
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};