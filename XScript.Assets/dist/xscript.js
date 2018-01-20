'use strict';

// setup CSRF safety for AJAX:
// gets and validates antiforgery token for posting data to server on ajax request
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    if (options.type.toUpperCase() === "POST") {
        // we need to add the verificationToken to all POSTs
        var token = $("input[name^=__RequestVerificationToken]").first();
        if (!token.length) {
            return;
        }

        var tokenName = token.attr("name");

        // if the data is JSON, then we need to put the token in the QueryString:
        if (options.contentType.indexOf("application/json") === 0) {
            // add the token to the URL, because we can't add it to the JSON data:
            options.url += (options.url.indexOf("?") === -1 ? "?" : "&") + token.serialize();
        } else if (typeof options.data === "string" && options.data.indexOf(tokenName) === -1) {
            // append to the data string:
            options.data += (options.data ? "&" : "") + token.serialize();
        }
    }
});

// validates a collection of inputs
$.fn.validateData = function () {
    if ($.validator && $.validator.unobtrusive) {
        // TODO: fix so that select does work in unobtrusive validate
        // filtering out select lists because they do not work in unobtrusive validate for some reason
        var $data = $(this);

        var $placeholders = $();
        $data.each(function (i, e) {
            var $placeholder = $("<div>");
            $data.eq(i).before($placeholder);
            $placeholders = $placeholders.add($placeholder);
        });

        var $form = $("<form>");
        $form.appendTo($(document.body));
        $form.append($data);

        // validate form data
        $form.removeData("validator") /* added by the raw jquery.validate plugin */
            .removeData("unobtrusiveValidation");  /* added by the jquery unobtrusive plugin*/

        $.validator.unobtrusive.parse($form);
        $form.validate();
        var isValid = $form.valid();

        // move inputs back to their original positions
        for (var i = 0; i < $data.length; i++) {
            $placeholders.eq(i).before($data.eq(i));
            $placeholders.eq(i).remove();
        }

        $form.remove();
        return isValid;
    }
};
'use strict';

var xscript = {
    _: {
        _busy: false
    }
};

(function () {
    // show loading overlay when navigating away from the page or reloading
    $(window).on("beforeunload", function () {
        $.LoadingOverlay("show");
    });

    // when using back and forward buttons, force reload to refresh the content
    $(window).on("popstate", function () {
        window.location.reload();
    });

    // when the page is loaded, refresh the event handlers and other content
    $(document).ready(function () {
        xscript.refreshContent($("body"));
    });
})();
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
'use strict';

xscript.execute = async function (options) {
    // apply default settings
    var settings = $.extend(true, {}, xscript.defaults, options);

    // display the busy icon and prevent additional input
    while (xscript._._busy) {
        await timeoutfunc(settings.retryTimeout);
    }

    if (xscript._._busy) {
        return;
    }

    if (settings.blockUi) {
        window.setTimeout(function () {
            if (xscript._._busy) {
                $.LoadingOverlay("show");
            }
            if (!xscript._._busy) {
                $.LoadingOverlay("hide", true);
            }
        }, settings.blockUiDelay);
    }

    // validate data
    var method;
    var $data
    if (settings.dataSelector !== undefined && settings.dataSelector !== null) {
        method = "post";
        $data = $(settings.dataSelector).find(":input,[data-valmsg-for],[data-valmsg-summary]");

        var isValid = $data.validateData();
        if (!isValid) {
            if (settings.blockUi) {
                xscript._._busy = false;
                $.LoadingOverlay("hide", true);
            }
            return;
        }
    } else {
        method = "get";
        $data = $();
    }

    // make request
    var request = $.ajax({
        method: method,
        url: settings.url,
        data: $data.serialize(),
        timeout: settings.requestTimeout
    });

    // get the result of the request. if there is an error, set the error flag
    var isError = false;
    try {
        await request;
    } catch (error) {
        isError = true;
    }

    // check if the response is to be processed or if it was just for cacheing/notifying
    if (settings.processResult) {
        var response = request.responseText;
        var $response = $(response);

        // check if the error flag is set or if there was an error status
        if (!isError || (request.status < 400
            || request.status >= 600)) {
            var responseBody = response.substring(response.indexOf("<body>") + 6, response.indexOf("</body>"));
            var $responseXmodalContent = $response.filter('[xmodal-open]').first();
            var $xmodalContainer = $('xmodal').first();

            // if there is an xmodal open and it is going to be close because
            // the body is being replaced or there is another xmodal coming in
            if ($xmodalContainer.length !== 0 && (responseBody[6] || $responseXmodalContent.length !== 0)) {
                var $xmodal = $xmodalContainer.find(".modal").first();
                await $xmodal.modal("hide").promise();
            }

            var $body = $("body");
            if (responseBody[6]) {
                // if the response contains the <body> tag, it will replace the <body> of the page content
                var $title = $("title").first();
                var newTitle = $response.find('title').addBack('title')[0].outerHTML;
                $title.replaceWith(newTitle);

                //TODO: Find scripts in response header and add to header if the src is different

                var $xurl = $("meta[name='xurl']").first();
                var oldXurlText = $xurl.attr("content").trim();
                var newXurl = $response.find("meta[name='xurl']").addBack("meta[name='xurl']")[0].outerHTML;
                var newXurlText = $(newXurl).attr("content").trim();
                $xurl.replaceWith(newXurl);

                await settings.animations.positionBody.before($body);
                $body.html(responseBody);
                if (oldXurlText !== newXurlText) {
                    history.pushState({}, $(newTitle).text(), newXurlText);
                }
                await settings.animations.positionBody.after($body);

                $body.removeClass("modal-open");

                await xscript.refreshContent($body);
            } else {
                // if the response does not contain a <body> tag, it will then replace any xtargets contained in the response
                var $content = $response.filter("[xtargets]");
                var promises = {};
                $content.each(function (index, content) {
                    promises[index] = new Promise(async function (resolve, reject) {
                        var $content = $(content);
                        var $targets = $($content.attr("xtargets"));
                        var position = $content.attr("xposition") || settings.position;
                        $content.removeAttr("xtargets");
                        $content.removeAttr("xposition");
                        switch (position) {
                            case 'before':
                                await settings.animations.positionBefore.before($targets, $content);
                                $targets.before($content);
                                await settings.animations.positionBefore.after($targets, $content);
                                break;
                            case 'prepend':
                                await settings.animations.positionPrepend.before($targets, $content);
                                $targets.prepend($content);
                                await settings.animations.positionPrepend.after($targets, $content);
                                break;
                            case 'append':
                                await settings.animations.positionAppend.before($targets, $content);
                                $targets.append($content);
                                await settings.animations.positionAppend.after($targets, $content);
                                break;
                            case 'after':
                                await settings.animations.positionAfter.before($targets, $content);
                                $targets.after($content);
                                await settings.animations.positionAfter.after($targets, $content);
                                break;
                            case 'replace':
                                await settings.animations.positionReplace.before($targets, $content);
                                $targets.replaceWith($content);
                                await settings.animations.positionReplace.after($targets, $content);
                                break;
                            case 'insert':
                                await settings.animations.positionInsert.before($targets, $content);
                                $targets.html($content.html());
                                await settings.animations.positionInsert.after($targets, $content);
                                break;
                            case 'remove':
                                await settings.animations.positionRemove.before($targets, $content);
                                $targets.remove();
                                await settings.animations.positionRemove.after($targets, $content);
                                break;
                        }

                        await xscript.refreshContent($content);

                        resolve();
                    });
                });

                await $.when(promises);
            }

            // after replacing the <body> and/or xtargets, check for xmodal content
            if ($responseXmodalContent.length !== 0) {
                $xmodalContainer = $("<xmodal>");
                $xmodalContainer.append($responseXmodalContent);
                $xmodalContainer.removeAttr("xmodal-open");
                $body.append($xmodalContainer);
                await xscript.refreshContent($xmodalContainer);
                var $modal = $responseXmodalContent.find(".modal").first();
                await $modal.modal("show");
            }
        } else if (response) {
            // display error response, if there was one
            document.write(response);
            $(document).off();
            history.pushState({}, $("title:first()").text || "Error", "/Error");
            if (settings.blockUi) {
                xscript._._busy = false;
            }
            return;
        }
    }

    // unblock the ui
    if (settings.blockUi) {
        xscript._._busy = false;
        $.LoadingOverlay("hide", true);
    }
    return;
};
'use strict';

xscript.refreshContent = async function ($content) {
    // precache the targets we will use
    var $xrefs = $content.find("[xref]");
    var $xmodalCloses = $("[xmodal-close]");

    $('[xtargets]').removeAttr("xtargets");

    $xrefs.filter("[xprecache]").each(async function (i, e) {
        var $e = $(e);

        await xscript.execute({
            url: $e.attr("xref"),
            dataSelector: $e.attr("xdata"),
            blockUi: false,
            timeout: 0,
            processResult: false
        });
    });

    $('[xsrc]').each(async function (i, e) {
        var $e = $(e);
        var ttl = $e.attr("xttl");
        var precache = e.hasAttribute("xprecache")

        if (ttl === undefined || ttl === null || precache) {
            await xscript.execute({
                url: $e.attr("xsrc"),
                dataSelector: $e.attr("xdata"),
                blockUi: false,
                timeout: 0,
                processResult: (ttl === undefined || ttl === null)
            });
            $e.removeAttr("xsrc");
            $e.removeAttr("precache");
        } else {
            var interval = window.setInterval(async function () {
                if (document.contains(e)) {
                    await xscript.execute({
                        url: $e.attr("xsrc"),
                        dataSelector: $e.attr("xdata"),
                        blockUi: false,
                        timeout: ttl,
                        processResult: !precache
                    });
                } else {
                    window.clearInterval(interval);
                }
            }, $e.attr("xttl") || 0);
        }
    });

    $xrefs.unbind("click.xscript").on("click.xscript", async function (e) {
        var $this = $(this);
        var xref = $this.attr("xref");
        var xdata = $this.attr("xdata");
        e.preventDefault();
        await xscript.execute({
            url: xref,
            dataSelector: xdata,
            blockUi: true,
            timeout: 0,
            processResult: true
        });
    });

    // turn all xrefs and xmodal-closes into links
    $().add($xrefs).add($xmodalCloses).each(function (i, e) {
        var $e = $(e);
        if (!$e[0].hasAttribute("href")) {
            $e.attr("href", $e.attr("xref"));
        }
    });

    $xmodalCloses.unbind("click.xscript").on("click.xscript", async function (e) {
        e.preventDefault();
        var $xmodal = $("xmodal").first().find(".modal").first();
        await $xmodal.modal("hide").promise();
    });

    // destroy xmodal on hide
    $("xmodal").on("hidden.bs.modal", function () {
        $(this).remove();
    });
};