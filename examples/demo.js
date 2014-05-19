var wd = require('wd');
var check = require('../index.js');

// create a new browser instance
var browser = wd.remote();
browser.init({ browserName: 'chrome' }, function (err) {
    if (err) { throw err; }

    // Define a list of things to check.
    // Checks happen in series so do the quick things first.
    var things = [];
    things.push({
        title: 'Stream is populated',
        condition: 'document.querySelectorAll("section.stream article").length > 0',
        timeout: 500,
        freq: 100
    });

    things.push({
        title: 'Twitter object is ready',
        condition: 'typeof window.twttr.widgets.load === "function"',
        timeout: 2000,
        freq: 100
    });

    var url = 'http://x-team.com';

    check(browser, url, things, function (err, res) {
        if (err) {
            console.error(err);
        }
        else {
            console.log('ok');
        }

        browser.quit(function () {});
    });
});
