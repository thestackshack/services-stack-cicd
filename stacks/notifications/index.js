'use strict';

const winston = require('winston');
const async = require('async');
const _ = require('lodash');

const slack = require('./lib/slack');
const sns = require('./lib/sns');
const parser = require('./lib/parser');

var functions = {};

//
// Slack Lambda, sends an SNS message to the slack hook url.
//
functions.slack = function(event, context) {
    winston.info('slack');
    winston.info(event.Records[0].Sns.Message);
    slack.post(event.Records[0].Sns.Message, process.env.NotificationSlack, function(err, results) {
        context.succeed(err);
    });
};

//
// Events Lambda, parses the SNS messages and sends a human readable (actionable) message out.
//
functions.events = function(event, context) {
    winston.info('events');
    try {
        var message = JSON.parse(event.Records[0].Sns.Message);
    } catch (err) {
        var message = event.Records[0].Sns.Message;
    }
    var text = parser.parse(message);
    if (!_.isNil(text)) {
        sns.publish({
            topic: process.env.NotificationTopic,
            message: text
        }, function (err, results) {
            context.succeed(err);
        });
    } else {
        context.succeed();
    }
};

module.exports = functions;