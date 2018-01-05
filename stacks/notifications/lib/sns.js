'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const winston = require('winston');

var functions = {};

//
// Send response back to Meridian's Event API over SNS
//
functions.publish = function(input, done) {
    winston.info('sns.publish');

    var params = {
        TopicArn: input.topic,
        Message: input.message
    };
    winston.info(JSON.stringify(params));
    sns.publish(params, done);
};

module.exports = functions;