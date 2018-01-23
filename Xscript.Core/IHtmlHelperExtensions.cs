using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;

namespace Xscript.Core
{
    public static class IHtmlHelperExtensions
    {
        /// <summary>
        /// Inserts Xscript sources into the page HTML to pull in required files
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="httpContext"></param>
        /// <param name="configureOptions"></param>
        /// <returns></returns>
        public static IHtmlContent XScriptTags(
            this IHtmlHelper htmlHelper, 
            HttpContext httpContext,
            Action<XScriptTagsOptions> configureOptions = null
        )
        {
            var options = new XScriptTagsOptions();
            configureOptions?.Invoke(options);

            string cacheQueryString = "";
            if (!options.CacheFiles)
            {
                cacheQueryString = $"?v={Guid.NewGuid().ToString()}";
            }

            var builder = new HtmlContentBuilder();
            if (options.IsDevelopment)
            {
                if (options.IncludeJQuery)
                {
                    builder.AppendHtmlLine($"<script src=\"/XScript/jquery.js{cacheQueryString}\"></script>");
                }
                if (options.IncludeJQueryValidation)
                {
                    builder.AppendHtmlLine($"<script src=\"/XScript/jquery.validate.js{cacheQueryString}\"></script>");
                }
                if (options.IncludeJQueryValidationUnobtrusive)
                {
                    builder.AppendHtmlLine($"<script src=\"/XScript/jquery.validate.unobtrusive.js{cacheQueryString}\"></script>");
                }
                if (options.IncludeGasparesgangaJQueryLoadingOverlay)
                {
                    builder.AppendHtmlLine($"<script src=\"/XScript/loadingoverlay.js{cacheQueryString}\"></script>");
                }
                if (options.IncludeBootstrap)
                {
                    builder.AppendHtmlLine($@"<link rel=""stylesheet"" href=""/XScript/bootstrap.css"" />
<script src=""/XScript/bootstrap.js{cacheQueryString}""></script>");
                }
                builder.AppendHtmlLine($"<script src=\"/XScript/xscript.js{cacheQueryString}\"></script>");
            }
            else
            {
                if (options.IncludeJQuery)
                {
                    builder.AppendHtmlLine($@"<script src=""https://ajax.aspnetcdn.com/ajax/jquery/jquery-2.2.0.min.js{cacheQueryString}""
        asp-fallback-src=""/XScript/jquery.min.js{cacheQueryString}""
        asp-fallback-test=""window.jQuery""
        crossorigin=""anonymous""
        integrity=""sha384-K+ctZQ+LL8q6tP7I94W+qzQsfRV2a+AfHIi9k8z8l9ggpc8X+Ytst4yBo/hH+8Fk"">
</script>");
                }
                if (options.IncludeJQueryValidation)
                {
                    builder.AppendHtmlLine($@"<script src=""https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js{cacheQueryString}""
        asp-fallback-src=""/XScript/jquery.validate.min.js{cacheQueryString}""
        asp-fallback-test=""window.jQuery && window.jQuery.validator""
        crossorigin=""anonymous""
        integrity=""sha384-Fnqn3nxp3506LP/7Y3j/25BlWeA3PXTyT1l78LjECcPaKCV12TsZP7yyMxOe/G/k"">
</script>");
                }
                if (options.IncludeJQueryValidationUnobtrusive)
                {
                    builder.AppendHtmlLine($@"<script src=""https://ajax.aspnetcdn.com/ajax/jquery.validation.unobtrusive/3.2.6/jquery.validate.unobtrusive.min.js{cacheQueryString}""
        asp-fallback-src=""/XScript/jquery.validate.unobtrusive.min.js{cacheQueryString}""
        asp-fallback-test=""window.jQuery && window.jQuery.validator && window.jQuery.validator.unobtrusive""
        crossorigin=""anonymous""
        integrity=""sha384-JrXK+k53HACyavUKOsL+NkmSesD2P+73eDMrbTtTk0h4RmOF8hF8apPlkp26JlyH"">
</script>");
                }
                if (options.IncludeGasparesgangaJQueryLoadingOverlay)
                {
                    builder.AppendHtmlLine($@"<script src=""https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@1.5.4/src/loadingoverlay.min.js{cacheQueryString}""
        asp-fallback-src=""/XScript/loadingoverlay.min.js{cacheQueryString}""
        asp-fallback-test=""jQuery.LoadingOverlay()""
        crossorigin=""anonymous"">
</script>");
                }
                if (options.IncludeBootstrap)
                {
                    builder.AppendHtmlLine($@"<link rel=""stylesheet"" href=""https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/css/bootstrap.min.css{cacheQueryString}""
asp-fallback-href=""/XScript/bootstrap.min.css{cacheQueryString}""
asp-fallback-test-class=""sr-only"" asp-fallback-test-property=""position"" asp-fallback-test-value=""absolute"" />");
                    builder.AppendHtmlLine($@"<script src=""https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/bootstrap.min.js{cacheQueryString}""
        asp-fallback-src=""/XScript/bootstrap.min.js{cacheQueryString}""
        asp-fallback-test=""window.jQuery && window.jQuery.fn && window.jQuery.fn.modal""
        crossorigin=""anonymous""
        integrity=""sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"">
</script>");
                }
                builder.AppendHtmlLine($"<script src=\"/XScript/xscript.min.js{cacheQueryString}\"></script>");
            }
            
            builder.AppendHtmlLine($"<meta name='xurl' content='{httpContext.Request.Path.ToString()}' >");

            return builder;
        }
    }
}
