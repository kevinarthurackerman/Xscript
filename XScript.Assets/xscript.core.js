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