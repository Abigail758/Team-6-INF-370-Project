using System;
using INF370.Group6.API.Layers.Core.Phases;

namespace INF370.Group6.API.Layers.Services.Dtos.Tasks
{
    public class GetTaskDto
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
      
        public string Description { get; set; }
        public DateTime RawStartDate { get; set; }
        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public DateTime RawEndDate { get; set; }
        public DateTime PhaseRawStartDate { get; set; }
        public DateTime PhaseRawEndDate { get; set; }

        public int PhaseId { get; set; }
        public string PhaseName { get; set; }

        public int TaskStatusId { get; set; }
        public string TaskStatusName { get; set; }
    }
}