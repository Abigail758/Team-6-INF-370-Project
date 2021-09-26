using System;

namespace INF370.Group6.API.Layers.Services.Dtos.ProjectsDtos
{
    public class GetProjectDto
    {
        public int Id { get; set; }
        public int ProjectStatusId { get; set; }
        public string ProjectStatusName { get; set; }

       
        public string Name { get; set; }
        
        public string Description { get; set; }
        public string StartDate { get; set; }
        public DateTime RawStartDate { get; set; }
        public string EndDate { get; set; }
        public DateTime RawEndDate { get; set; }

        public string SiteName { get; set; }
        public string SiteAddress { get; set; }
    }
}