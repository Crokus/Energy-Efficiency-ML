using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace EnergyEfficiencyMl.Web.Models
{
    public class HeatingLoad
    {
        public double ConsumptionPerSquareMeter { get; set; }
        public double TotalConsumption { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public EnergyEfficiency Efficiency { get; set; }
    }
}
