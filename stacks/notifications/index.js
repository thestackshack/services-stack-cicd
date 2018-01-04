'use strict';

const winston = require('winston');
const async = require('async');
const _ = require('lodash');

const slack = require('./lib/slack');

var functions = {};

functions.slack = function(event, context) {
    winston.info('slack');
    winston.info(JSON.stringify(event));
    context.succeed();
};

functions.events = function(event, context) {
    winston.info('events');
    winston.info(JSON.stringify(event));
    context.succeed();
};

module.exports = functions;