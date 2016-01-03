using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using EnergyEfficiencyMl.Web.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace EnergyEfficiencyMl.Web.Controllers
{
    public class HeatingLoadController : ApiController
    {
        private readonly HttpClient _client = new HttpClient();
        // TODO: DI
        private readonly double mediumEfficiencyThreshold = double.Parse(ConfigurationManager.AppSettings["efficiencyThreshold.medium"]);
        private readonly double highEfficiencyThreshold = double.Parse(ConfigurationManager.AppSettings["efficiencyThreshold.high"]);

        // POST api/heatingload
        public async Task<IHttpActionResult> Post([FromBody] BuildingParameters buildingParameters)
        {
            // TODO: add DI and extract all code, which gets the assessed heating load from controller to a service
            var url = ConfigurationManager.AppSettings["aml.url"];
            var apiKey = ConfigurationManager.AppSettings["aml.apiKey"];

            // wraping payload with proper web service input model
            var amlInput = CreateAmlInput(buildingParameters);

            var content = JsonConvert.SerializeObject(amlInput,
                new JsonSerializerSettings {ContractResolver = new CamelCasePropertyNamesContractResolver()});

            // composing request
            var amlRequest = CreateRequestMessage(url, apiKey, content);

            var result = await _client.SendAsync(amlRequest);

            if (result.StatusCode != HttpStatusCode.OK)
            {
                return InternalServerError();
            }

            string resultContent = await result.Content.ReadAsStringAsync();    
            JObject resultObject = JObject.Parse(resultContent);

            // TODO: ouch!
            // Schema of your Web Service output object might be different, change accordingly
            double heatingLoadValue = resultObject.SelectToken("Results.output1.value.Values[0][6]").Value<double>();

            HeatingLoad heatingLoadModel = CreateHeatingLoadResponse(heatingLoadValue, buildingParameters.SurfaceArea);

            return Ok(heatingLoadModel);
        }

        private HeatingLoad CreateHeatingLoadResponse(double heatingLoadValue, double? surfaceArea)
        {
            HeatingLoad heatingLoadModel = new HeatingLoad();

            heatingLoadModel.ConsumptionPerSquareMeter = heatingLoadValue;
            heatingLoadModel.TotalConsumption = heatingLoadValue * surfaceArea.Value;
            heatingLoadModel.Efficiency = CalculateEfficiency(heatingLoadValue);

            return heatingLoadModel;
        }

        private EnergyEfficiency CalculateEfficiency(double heatingLoadValue)
        {
            EnergyEfficiency efficiency;
            if (heatingLoadValue < mediumEfficiencyThreshold)
                efficiency = EnergyEfficiency.Low;
            else if (heatingLoadValue < highEfficiencyThreshold)
                efficiency = EnergyEfficiency.Medium;
            else
                efficiency = EnergyEfficiency.High;

            return efficiency;
        }

        private AmlInputModel CreateAmlInput(BuildingParameters buildingParameters)
        {
            var amlInput = new AmlInputModel
            {
                Inputs = new Inputs
                {
                    Input1 = new InputParameters
                    {
                        Values = new List<List<string>>
                        {
                            // Order and number of your Web Service inputs might be different, change accordingly
                            new List<string>
                            {
                                "0",
                                buildingParameters.SurfaceArea.ToString(),
                                buildingParameters.WallArea.ToString(),
                                buildingParameters.RoofArea.ToString(),
                                buildingParameters.OverallHeight.ToString(),
                                "0",
                                buildingParameters.GlazingArea.ToString(),
                                "0",
                                "0",
                                "0"
                            }
                        }
                    }
                }
            };
            return amlInput;
        }

        private HttpRequestMessage CreateRequestMessage(string url, string apiKey, string content)
        {
            var mlRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(url),
                Headers =
                {
                    Authorization = new AuthenticationHeaderValue("Bearer", apiKey)
                },
                Content = new StringContent(content, Encoding.UTF8, "application/json")
            };
            return mlRequest;
        }
    }
}