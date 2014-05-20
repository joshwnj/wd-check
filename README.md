wd-check
====

Check that a group of conditions are all met within a browser.

A convenience wrapper around <https://www.npmjs.org/package/wd>, useful for when you need to check that certain objects are loading, or certain elements are being populated.

Example
----

```
var wd = require('wd');
var check = require('wd-check');

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
```

Backstory
----

This was originally used for automated testing of a video player integration that was being refactored. When video playback succesfully begins we see advertisements populated on the page. So by checking the contents of ad elements we have an easy indirect way to prove playback has commenced.
