'use strict';

xscript.refreshContent = async function ($content) {
    // precache the targets we will use
    var $xrefs = $content.find("[xref]");
    var $xmodalCloses = $("[xmodal-close]");

    $('[xtargets]').removeAttr("xtargets");

    $xrefs.filter("[xfetch='eager']").each(async function (i, e) {
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
        var fetch = $e.attr("xfetch").toLowerCase() === "eager";

        if (ttl === undefined || ttl === null || fetch) {
            await xscript.execute({
                url: $e.attr("xsrc"),
                dataSelector: $e.attr("xdata"),
                blockUi: false,
                timeout: 0,
                processResult: (ttl === undefined || ttl === null)
            });

            $e.removeAttr("xfetch");
            if (ttl > 0) {
            } else {
                $e.removeAttr("xsrc");
            }
        } else {
            var interval = window.setInterval(async function () {
                if (document.contains(e)) {
                    await xscript.execute({
                        url: $e.attr("xsrc"),
                        dataSelector: $e.attr("xdata"),
                        blockUi: false,
                        timeout: ttl,
                        processResult: !fetch
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