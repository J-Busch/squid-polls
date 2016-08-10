'use strict';

module.exports = {
    'twitterAuth' : {
        'consumerKey': String(process.env.TWITTER_KEY),
        'consumerSecret': String(process.env.TWITTER_SECRET),
        'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
    }
};