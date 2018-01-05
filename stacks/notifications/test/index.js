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


    it('events - ecs-01', function (done) {
        var sns = {
            publish: function(input, done) {
                winston.info('test - sns.publish');
                winston.info(input.message);
                assert.equal(input.topic, 'test');
                assert.equal(input.message, 'i-0d69b9fd1ef15dd72, ACTIVE, , , false, ');
                done();
            }
        };
        var index = proxyquire('../index', {
            './lib/sns': sns
        });
        process.env.NotificationTopic = 'test';
        index.events(require('./resources/ecs-01.json'), {
            succeed: done
        });
    });


    it('events - ecs-task-01', function (done) {
        var sns = {
            publish: function(input, done) {
                winston.info('test - sns.publish');
                winston.info(input.message);
                assert.equal(input.topic, 'test');
                assert.equal(input.message, 'service:app-service1-service-prod-Service-IKHVELUD8SL0, STOPPED, STOPPED, Task stopped by user, 5');
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