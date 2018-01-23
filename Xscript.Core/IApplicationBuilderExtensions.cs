using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System.Reflection;

namespace Xscript.Core
{
    public static class IApplicationBuilderExtensions
    {
        /// <summary>
        /// Registers the embedded file provider for Xscript capabilities
        /// </summary>
        /// <param name="appBuilder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseXscript(this IApplicationBuilder appBuilder)
        {
            appBuilder.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new EmbeddedFileProvider(Assembly.GetAssembly(typeof(Xscript.Assets.Assembly)),"Xscript.Assets.dist"),
                RequestPath = new PathString("/XScript")
            });

            return appBuilder;
        }
    }
}
