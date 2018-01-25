# Xscript
Xscript is a library meant to make it easy to start a new SPA app or convert an existing MVC project into a SPA app. Unlike the popular SPA frameworks, Xscript does not require you to write any JavaScript (unless you want to!), and does not dictate how you must structure your project. Instead, it gives you access to a small collection of powerful attributes you can use to mark up your HTML and add SPA capabilities instantly.
## Getting Started
### Prerequisites
All prerequisites can be included manually or included automatically following the quick start guide
* [jQuery](https://github.com/jquery/jquery)
* [Bootstrap](https://github.com/twbs/bootstrap)
* [jQuery Validation](https://github.com/jquery-validation/jquery-validation)
* [jQuery Validation Unobtrusive](https://github.com/aspnet/jquery-validation-unobtrusive)
* [Gasparesganga jQuery Loading Overlay](https://github.com/gasparesganga/jquery-loading-overlay)
### Quick Start Guide
First, add the Xscript embedded files to your application in your startup.cs class
```csharp
using Xscript.Core;
...
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
	...
	app.UseXscript();
	...
}
...
```

Next, add the namespace to your _ViewImports.cshtml file (alternatively, you could do this in your layout page(s).

```html
...
@using Xscript.Core
...
```
		
Finally, add references and other required HTML to your .cshtml layout page(s). You can use the options to include different required libraries, or you can supply them yourself before calling the XScriptTags method. Make sure to include the antiforgery token if you need it to post data.

```html
...
<head>
    ...
    <environment include="Development">
        @Html.XScriptTags(Context, x =>
        {
            x.IsDevelopment = true;
            x.IncludeBootstrap = true;
            x.IncludeJQuery = true;
            x.IncludeJQueryValidation = true;
            x.IncludeJQueryValidationUnobtrusive = true;
            x.IncludeGasparesgangaJQueryLoadingOverlay = true;
            x.CacheFiles = false;
        })
        ...
        <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
        <script src="~/js/site.js" asp-append-version="true"></script>
    </environment>
    <environment exclude="Development">
        @Html.XScriptTags(Context, x =>
        {
            x.IsDevelopment = false;
            x.IncludeBootstrap = true;
            x.IncludeJQuery = true;
            x.IncludeJQueryValidation = true;
            x.IncludeJQueryValidationUnobtrusive = true;
            x.IncludeGasparesgangaJQueryLoadingOverlay = true;
            x.CacheFiles = true;
        })
        ...
        <link rel="stylesheet" href="~/css/site.min.css" asp-append-version="true" />
        <script src="~/js/site.js" asp-append-version="false"></script>
    </environment>
</head>
<body>
    @Html.AntiForgeryToken()
	...
</body>
...
```

Congrats, you are good to go. Check out the examples to see how you can quickly and easily start adding SPA features to your project.

### Examples
Coming soon!
## Supported Attributes
* **xref="url"** - When added to an element, it becomes an href, but will get the content with AJAX, and insert it into the page. Any content with a body tag will replace the current page's body tag and close any xmodals that are open. Any content with xmodal-open tags will create a modal and open it. Only one xmodal open at a time is supported. Any content with xtargets tags will replace any content in the current page that matches the selector.
* **xsrc="url"** - When added to an element, gets the url via AJAX, and the content is inserted into the page (similar to xref). The element does not become a clickable link, and if no xttl is specified, the xsrc will disappear after it is completed. Defaults to eagerly loading, but can be set to lazy load on scroll with xfetch attribute (not implemented yet)
* **xfetch="single item from fetch list"** - When paired with an xsrc or xref, it will cause the request to be made either eagerly when the page loads so that the result can be cached or lazily when the element is scrolled into view to aviod loading content unnecessarily.
  #### Fetch List
  * **eager** - fetches the content immediately (usually to be used for precaching)
  * **lazy** - fetches the content lazily (usually for avoiding unnecessary requests) (*not implemented yet*)
  
* **xttl="milliseconds"** - When paired with a xsrc, it will cause the xsrc to repeat as long as it is in the dom.
* **xdata="jquery selector"** - When paired with an xref or xsrc, adds any input elements matching the selector and the first antiforgery token in the dom, validates the inputs, and sends them with the request. This converts the request to a post.
* **xtargets="jquery selector"** - When elements with this attribute are at the root level of a document requested via an xref or xsrc, the elements will be placed into the dom where if finds elements matching the selector. If no xposition is specified it will default to replacing the targeted elements.
* **xposition="single item from positions list"** - When pair with an xtargets, this can override the default the default replace behavior to place the content in another position relative to the targeted elements.
  #### Positions List
  * **before** - places the content before the targeted element
  * **prepend** - places the content within the targeted element as the first item
  * **append** - places the content within the targeted element as the last item
  * **after** - places the content after the targeted element
  * **replace** - (default) replaces the targeted element with the content
  * **insert** - replaces the inner content of the target with the inner content of the content
  * **remove** - removes the targeted element (this ignores the content entirely)
  
* **xmodal-open=""** - When elements with this attribute are at the root level of a document requested via an xref or xsrc, the elements will be placed into an xmodal element and shown as a modal. Only one xmodal open at a time is supported. Elements should match the structure of a well formed bootstrap modal. Closing an xmodal, either by loading a new page, clicking an xmodal-close link, or clicking off of the modal will destroy it.
* **xmodal-close=""** - When added to an element, it becomes an href, but will close the currently opened xmodal.
## Author
[Kevin Ackerman](https://github.com/kevinarthurackerman)
## License
### [MIT](https://opensource.org/licenses/MIT)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.