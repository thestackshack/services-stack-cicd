'use strict';

const assert = require('assert');
const winston = require('winston');
const proxyquire =  require('proxyquire');
const _ = require('lodash');


describe('index', function() {
    it('events - codebuild-01', function (done) {
        var sns = {
            publish: function(input, done) {
                winston.info('test - sns.publish');
                winston.info(input.message);
                assert.equal(input.topic, 'test');
                assert.equal(input.message, 'app-service1-prod-code-build SUCCEEDED');
                done();
            }
        };
        var index = proxyquire('../index', {
            './lib/sns': sns
        });
        process.env.NotificationTopic = 'test';
        index.events(require('./resources/codebuild-01.json'), {
            succeed: done
        });
    });
    it('events - codebuild-02', function (done) {
        var sns = {
            publish: function(input, done) {
                winston.info('test - sns.publish');
                winston.info(input.message);
                assert.equal(input.topic, 'test');
                assert.equal(input.message, 'app-service1-prod-code-build IN_PROGRESS');
                done();
            }
        };
        var index = proxyquire('../index', {
            './lib/sns': sns
        });
        process.env.NotificationTopic = 'test';
        index.events(require('./resources/codebuild-02.json'), {
            succeed: done
        });
    });


    it('events - ecs-task-01', function (done) {
        var sns = {
            publish: function(input, done) {
                winston.info('test - sns.publish');
                winston.info(input.message);
                assert.equal(input.topic, 'test');
                assert.equal(input.message, 'status: STOPPED\n' +
                    'service: service:app-service1-service-prod-Service-IKHVELUD8SL0\n' +
                    'taskDefinition: arn:aws:ecs:us-east-1:132093761664:task-definition/app-service1-service-prod:5\n' +
                    'task: arn:aws:ecs:us-east-1:132093761664:task/48dc50ff-4df4-4fea-a9fc-8a0e192f9f45\n' +
                    'reason: Task stopped by user');
                done();
            }
        };
        var index = proxyquire('../index', {
            './lib/sns': sns
        });
        process.env.NotificationTopic = 'test';
        index.events(require('./resources/ecs-task-02.json'), {
            succeed: done
        });
    });


    it('events - push-image-01', function (done) {
        var sns = {
            publish: function(input, done) {
                winston.info('test - sns.publish');
                winston.info(input.message);
                assert.equal(input.topic, 'test');
                assert.equal(input.message, 'app-prod version 1ce8d5c6 is ready.');
                done();
            }
        };
        var index = proxyquire('../index', {
            './lib/sns': sns
        });
        process.env.NotificationTopic = 'test';
        index.events(require('./resources/push-image-01.json'), {
            succeed: done
        });
    });
});