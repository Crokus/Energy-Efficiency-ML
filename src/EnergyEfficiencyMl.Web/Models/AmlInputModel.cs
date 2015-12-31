using System.Collections.Generic;

namespace EnergyEfficiencyMl.Web.Models
{
    // Schema below might be different in your exposed Web Service input, change accordingly
    public class AmlInputModel
    {
        public Inputs Inputs { get; set; }
    }

    public class Inputs
    {
        public InputParameters Input1 { get; set; }
    }

    public class InputParameters
    {
        public List<List<string>> Values { get; set; }
    }
}