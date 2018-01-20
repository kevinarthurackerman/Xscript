'use strict';

xscript.defaults = {
    // the url that a request will be made to
    url: ".",
    // the selector used to get any data to send with the request
    dataSelector: null,
    // the position relative to the xtargets to place response content
    position: 'replace',
    // should we popup a loading icon and prevent further user input?
    blockUi: true,
    // how long should we wait to pop up the loading icon?
    blockUiDelay: 5000,
    // how long should we wait before we give up on a request (0=never)
    requestTimeout: 0,
    // if we are blocked by another request, how often should we check if we can go?
    retryTimeout: 100,
    // do we want to process the xtragets, etc in the result (typically false when we are just precaching)
    processResult: true,
    // transition animations for incoming content
    animations: {
        positionBody: {
            before: function ($body) {
                $body
                    .animate({
                        opacity: 0,
                        duration: 100
                    });
                return $body.promise();
            },
            after: function ($body) {
                $body
                    .animate({
                        opacity: 1,
                        queue: false,
                        duration: 100
                    });
                return $body.promise();
            }
        },
        positionBefore: {
            before: function ($targets, $content) {
                $content
                    .hide()
                    .css('opacity', 0);
                return Promise.resolve();
            },
            after: function ($targets, $content) {
                $content
                    .slideDown()
                    .animate({
                        opacity: 1,
                        queue: false,
                        duration: 100
                    });
                return $content.promise();
            }
        },
        positionPrepend: {
            before: function ($targets, $content) {
                $content
                    .hide()
                    .css('opacity', 0);
                return Promise.resolve();
            },
            after: function ($targets, $content) {
                $content
                    .slideDown()
                    .animate({
                        opacity: 1,
                        queue: false,
                        duration: 100
                    });
                return $content.promise();
            }
        },
        positionAppend: {
            before: function ($targets, $content) {
                $content
                    .hide()
                    .css('opacity', 0);
                return Promise.resolve();
            },
            after: function ($targets, $content) {
                $content
                    .slideDown()
                    .animate({
                        opacity: 1,
                        queue: false,
                        duration: 100
                    });
                return $content.promise();
            }
        },
        positionAfter: {
            before: function ($targets, $content) {
                $content
                    .hide()
                    .css('opacity', 0);
                return Promise.resolve();
            },
            after: function ($targets, $content) {
                $content
                    .slideDown()
                    .animate({
                        opacity: 1,
                        queue: false,
                        duration: 100
                    });
                return $content.promise();
            }
        },
        positionReplace: {
            before: function ($targets, $content) {
                $content
                    .hide()
                    .css('opacity', 0);
                $targets
                    .animate({
                        opacity: 0,
                        queue: false,
                        duration: 100
                    });
                return $targets.promise();
            },
            after: function ($targets, $content) {
                $content
                    .slideDown()
                    .animate({
                        opacity: 1,
                        queue: false,
                        duration: 100
                    });
                return $content.promise();
            }
        },
        positionInsert: {
            before: function ($targets, $content) {
                $targets
                    .animate({
                        opacity: 0,
                        duration: 100
                    });
                return $targets.promise();
            },
            after: function ($targets, $content) {
                $targets
                    .animate({
                        opacity: 1,
                        queue: false,
                        duration: 100
                    });
                return $targets.promise();
            }
        },
        positionRemove: {
            before: function ($targets, $content) {
                $targets
                    .animate({
                        opacity: 0,
                        queue: false,
                        duration: 100
                    });
                return $targets.promise();
            },
            after: function ($targets, $content) {
                return Promise.resolve();
            }
        }
    }
};