supported attributes:

xref="url" -   When added to an element, it becomes an href, but will get the content with AJAX, and insert it into the page.
               Any content with a body tag will replace the current page's body tag and close any xmodals that are open.
			   Any content with xmodal-open tags will create a modal and open it. Only one xmodal open at a time is supported.
			   Any content with xtargets tags will replace any content in the current page that matches the selector.
			   Multiple xtargets can be passed in a single document.

xsrc="url" -   When added to an element, get the url via AJAX, and the content inserted into the page (similar to xref).
               The element does not become a clickable link, and if no xttl is specified, the xsrc will disappear after it is completed.

xprecache="" - When paired with an xsrc or xref, it will cause the request to be made eagerly when the page loads
               so that the result can be cached.

xttl="milliseconds" - When paired with a xsrc, it will cause the xsrc to repeat as long as it is in the dom.

xdata="jquery selector" - When paired with an xref or xsrc, adds any input elements matching the selector and the first antiforgery token
                          in the dom, validates the inputs, and sends them with the request. This converts the request to a post.

xtargets="jquery selector" - When elements with this attribute are at the root level of a document requested via an xref or xsrc, the
                             elements will be placed into the dom where if finds elements matching the selector. If no xposition is
							 specified it will default to replacing the targeted elements.

xposition="single item from positions list" - When pair with an xtargets, this can override the default the default replace behavior to 
                                              place the content in another position relative to the targeted elements.
	positions list
        before - places the content before the targeted element
	    prepend - places the content within the targeted element as the first item
	    append - places the content within the targeted element as the last item
	    after - places the content after the targeted element
	    replace - (default) replaces the targeted element with the content
	    insert - replaces the inner content of the target with the inner content of the content
	    remove - removes the targeted element (this ignores the content entirely)

xmodal-open="" - When elements with this attribute are at the root level of a document requested via an xref or xsrc, the elements will be
                 placed into an xmodal element and shown as a modal. Only one xmodal open at a time is supported. Elements should match the
				 structure of a well formed bootstrap modal. Closing an xmodal, either by loading a new page, clicking an xmodal-close link,
				 or clicking off of the modal will destroy it.

xmodal-close="" -  When added to an element, it becomes an href, but will close the currently opened xmodal.