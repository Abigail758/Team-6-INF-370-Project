using System.Collections.Generic;

namespace INF370.Group6.API.Layers.Core.Phases
{
    public class PhaseStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<Phase> Phases { get; set; }

        public PhaseStatus()
        {
            Phases = new List<Phase>();
        }
    }
}