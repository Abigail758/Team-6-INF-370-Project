using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using INF370.Group6.API.Layers.Core.Phases;
using INF370.Group6.API.Layers.Core.Projects.ProjectStatuses;

namespace INF370.Group6.API.Layers.Core.Projects
{
    public class Project
    {
        public int Id { get; set; }

      

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [Required]
        [MaxLength(255)]
        public string SiteName { get; set; }
        [Required]
        public string SiteAddress { get; set; }

        public virtual List<Phase> Phases { get; set; }

        public virtual ProjectStatus ProjectStatus { get; set; }
        public int ProjectStatusId { get; set; }

        public Project()
        {
            Phases = new List<Phase>();
        }

    }
}