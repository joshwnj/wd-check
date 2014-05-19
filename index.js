var async = require('async');

function check (browser, options, callback) {
    async.series([
        function (cb) {
            browser.setAsyncScriptTimeout(options.timeout, cb);
        },

        function (cb) {
            browser.waitForConditionInBrowser(options.condition, options.timeout, options.freq, cb);
        }
    ], callback);
}

module.exports = function (browser, url, things, callback) {
    var tasks = [];
    var current;

    tasks.push(function (cb) {
        browser.get(url, cb);
    });

    things.forEach(function (options) {
        tasks.push(function (cb) {
            current = options;
            browser.setAsyncScriptTimeout(options.timeout, cb);
        });

        tasks.push(function (cb) {
            browser.waitForConditionInBrowser(options.condition, options.timeout, options.freq, cb);
        });
    });

    async.series(tasks, function (err) {
        if (err) {
            return callback(new Error('failed: ' + current.title));
        }

        callback();
    });
};
