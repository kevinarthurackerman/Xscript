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