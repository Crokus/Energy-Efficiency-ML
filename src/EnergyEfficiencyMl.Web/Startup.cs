using EnergyEfficiencyMl.Web;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof (Startup))]

namespace EnergyEfficiencyMl.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}