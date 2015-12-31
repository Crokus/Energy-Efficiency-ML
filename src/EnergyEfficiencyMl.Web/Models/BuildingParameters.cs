using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyEfficiencyMl.Web.Models
{
    public class BuildingParameters
    {
        public double SurfaceArea { get; set; }
        public double WallArea { get; set; }
        public double RoofArea { get; set; }
        public double OverallHeight { get; set; }
        public double GlazingArea { get; set; }
    }
}
