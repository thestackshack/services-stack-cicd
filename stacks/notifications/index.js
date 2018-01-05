'use strict';

const winston = require('winston');
const async = require('async');
const _ = require('lodash');

const slack = require('./lib/slack');
const sns = require('./lib/sns');

var functions = {};

functions.slack = function(event, context) {
    winston.info('slack');
    winston.info(JSON.stringify(event.Records[0].Sns.Message));
    context.succeed();
};

functions.events = function(event, context) {
    winston.info('events');
    winston.info(JSON.stringify(event.Records[0].Sns.Message));
    sns.publish({
        topic: process.env.NotificationTopic,
        message: JSON.stringify(event.Records[0].Sns.Message)
    }, function(err, results) {
        context.succeed();
    });
};

module.exports = functions;