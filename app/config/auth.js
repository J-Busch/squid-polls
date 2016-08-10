'use strict';

module.exports = {
    'twitterAuth' : {
        'consumerKey': process.env.TWITTER_KEY.toString(),
        'consumerSecret': process.env.TWITTER_SECRET.toString(),
        'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
    }
};