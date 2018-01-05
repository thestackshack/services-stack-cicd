'use strict';

var functions = {};

//
// Post a message to the slack hook.
//
functions.post = function(text, hook_url, done) {
    const slack_hook_url_parts =
        url.parse(hook_url);

    const options = {
        hostname: slack_hook_url_parts.host,
        port: 443,
        path: slack_hook_url_parts.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(JSON.stringify(options));

    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('data');
            done(null, chunk);
        });
        res.on('end', function() {
            console.log('end');
            done(null, null);
        });
    });

    req.on('error', function(err) {
        done(err, null);
    });

    // write data to request body
    req.write(JSON.stringify({
        text: text
    }));
    req.end();
};

module.exports = functions;