using System;

namespace INF370.Group6.API.Layers.Services.Dtos.Phases
{
    public class GetPhaseDto
    {
        public int Id { get; set; }
       
        public string Name { get; set; }
        
        public string Description { get; set; }
        public DateTime RawStartDate { get; set; }
        public string StartDate { get; set; }
        public DateTime RawEndDate { get; set; }
        public string EndDate { get; set; }

        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public DateTime ProjectRawStartTime { get; set; }
        public DateTime ProjectRawEndTime { get; set; }


        public int PhaseStatusId { get; set; }
        public string PhaseStatusName { get; set; }
    }
}