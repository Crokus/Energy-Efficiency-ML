using System.Web.Http;
using EnergyEfficiencyMl.Web;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof (Startup))]

namespace EnergyEfficiencyMl.Web
{
    public class Startup
    {
        public static HttpConfiguration HttpConfiguration { get; private set; }
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration = new HttpConfiguration();
            WebApiConfig.Register(HttpConfiguration);

            app.UseWebApi(HttpConfiguration);
        }
    }
}