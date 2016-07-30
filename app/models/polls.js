'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    
        pid: Number,
    
        pollTitle: {
            title: String,
            author: String
        },
        
        pollItems: [
            {
                item: String,
                voteNbr: Number
            }
        ]
});

module.exports = mongoose.model('Poll', Poll);