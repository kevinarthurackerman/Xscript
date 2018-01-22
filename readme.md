<h1>Xscript</h1>
<h2>What Is It?</h2>
<p>Coming soon!</p>
<h2>Why Use It?</h2>
<p>Coming soon!</p>
<h2>Supported Attributes</h2>
<ul>
  <li>
    <b>xref="url"</b> - When added to an element, it becomes an href, but will get the content with AJAX, and insert it into the page. Any content with a body tag will replace the current page's body tag and close any xmodals that are open. Any content with xmodal-open tags will create a modal and open it. Only one xmodal open at a time is supported. Any content with xtargets tags will replace any content in the current page that matches the selector.
  </li>
  <li>
    <b>xsrc="url"</b> - When added to an element, gets the url via AJAX, and the content is inserted into the page (similar to xref). The element does not become a clickable link, and if no xttl is specified, the xsrc will disappear after it is completed. Defaults to eagerly loading, but can be set to lazy load on scroll with xfetch attribute (not implemented yet)
  </li>
  <li>
    <b>xfetch="single item from fetch list"</b> - When paired with an xsrc or xref, it will cause the request to be made either eagerly when the page loads so that the result can be cached or lazily when the element is scrolled into view to aviod loading content unnecessarily.
    <br>
    <b>fetch list</b>
    <ul>
      <li>
        <b>eager</b> - fetches the content immediately (usually to be used for precaching)
      </li>
      <li>
        <b>lazy</b> - fetches the content lazily (usually for avoiding unnecessary requests) (not implemented yet)
      </li>
    </ul>
  </li>
  <li>
    <b>xttl="milliseconds"</b> - When paired with a xsrc, it will cause the xsrc to repeat as long as it is in the dom.
  </li>
  <li>
    <b>xdata="jquery selector"</b> - When paired with an xref or xsrc, adds any input elements matching the selector and the first antiforgery token in the dom, validates the inputs, and sends them with the request. This converts the request to a post.
  </li>
  <li>
    <b>xtargets="jquery selector"</b> - When elements with this attribute are at the root level of a document requested via an xref or xsrc, the elements will be placed into the dom where if finds elements matching the selector. If no xposition is specified it will default to replacing the targeted elements.
  </li>
  <li>
    <b>xposition="single item from positions list"</b> - When pair with an xtargets, this can override the default the default replace behavior to place the content in another position relative to the targeted elements.
    <br>
    <b>positions list</b>
    <ul>
      <li>
        <b>before</b> - places the content before the targeted element
      </li>
      <li>
        <b>prepend</b> - places the content within the targeted element as the first item
      </li>
      <li>
        <b>append</b> - places the content within the targeted element as the last item
      </li>
      <li>
        <b>after</b> - places the content after the targeted element
      </li>
      <li>
        <b>replace</b> - (default) replaces the targeted element with the content
      </li>
      <li>
        <b>insert</b> - replaces the inner content of the target with the inner content of the content
      </li>
      <li>
        <b>remove</b> - removes the targeted element (this ignores the content entirely)
      </li>
    </ul>
  <li>
    <b>xmodal-open=""</b> - When elements with this attribute are at the root level of a document requested via an xref or xsrc, the elements will be placed into an xmodal element and shown as a modal. Only one xmodal open at a time is supported. Elements should match the structure of a well formed bootstrap modal. Closing an xmodal, either by loading a new page, clicking an xmodal-close link, or clicking off of the modal will destroy it.
  </li>
  <li>
    <b>xmodal-close=""</b> - When added to an element, it becomes an href, but will close the currently opened xmodal.
  </li>
</ul>
<h2>About me</h2>
<p>Coming soon!</p>