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