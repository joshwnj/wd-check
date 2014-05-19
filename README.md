wd-check
====

Check that a group of conditions are all met within a browser.

A convenience wrapper around <https://www.npmjs.org/package/wd>, useful for when you need to check that certain objects are loading, or certain elements are being populated.

Backstory
----

This was originally used for automated testing of a video player integration that was being refactored. When video playback succesfully begins we see advertisements populated on the page. So by checking the contents of ad elements we have an easy indirect way to prove playback has commenced.
