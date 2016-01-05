using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace EnergyEfficiencyMl.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Remove the XML formatter
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            var jsonFormatter = config.Formatters.JsonFormatter;
            jsonFormatter.UseDataContractJsonSerializer = false;
            var settings = jsonFormatter.SerializerSettings;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new {id = RouteParameter.Optional});

            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
        }
    }
}