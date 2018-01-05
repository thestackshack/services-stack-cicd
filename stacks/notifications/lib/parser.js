'use strict';
const winston = require('winston');
const _ = require('lodash');

var functions = {};

functions.parse_codebuild = function(message) {

    const status = message.detail['build-status'];
    const project = message.detail['project-name'];

    // If failed.  Get logs path.
    var text = project+' '+status;
    if (status === 'FAILED') {
        text += '\n';
        text += 'https://console.aws.amazon.com/cloudwatch/home?region='+message.region+'#logEventViewer:group=/aws/codebuild/'+project+';start=PT5M';
    }

    if (_.includes(['IN_PROGRESS', 'FAILED'], status))
        return text;
    else
        return null;
};

functions.parse_ecs_instance = function(message) {
    const ec2InstanceId = message.detail.ec2InstanceId;
    const status = message.detail.status;
    const pendingTasksCount = message.detail.pendingTasksCount;
    const runningTasksCount = message.detail.runningTasksCount;
    const agentConnected = message.detail.agentConnected;
    const agentUpdateStatus = message.detail.agentUpdateStatus;
    return null;
};

functions.parse_ecs_task = function(message) {
    const group = message.detail.group;
    const desiredStatus = message.detail.desiredStatus;
    const lastStatus = message.detail.lastStatus;
    const stoppedReason = message.detail.stoppedReason;
    const taskDefinitionArn = message.detail.taskDefinitionArn;
    return _.join([
        group,
        desiredStatus,
        lastStatus,
        stoppedReason,
        taskDefinitionArn
    ], ', ');
};

functions.parse = function(message) {
    winston.info('parser.parse');
    winston.info(message);
    if (_.isString(message))
        return message;
    else if (_.isEqual(message['detail-type'], 'CodeBuild Build State Change'))
        return functions.parse_codebuild(message);
    else if (_.isEqual(message['detail-type'], 'ECS Container Instance State Change'))
        return functions.parse_ecs_instance(message);
    else if (_.isEqual(message['detail-type'], 'ECS Task State Change'))
        return functions.parse_ecs_task(message);
    else
        return null;
};

module.exports = functions;