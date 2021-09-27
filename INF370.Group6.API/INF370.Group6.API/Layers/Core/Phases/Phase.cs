using System;
using System.ComponentModel.DataAnnotations;
using INF370.Group6.API.Layers.Core.Projects;

namespace INF370.Group6.API.Layers.Core.Phases
{
    public class Phase
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual Project Project { get; set; }
        public int ProjectId { get; set; }

        public virtual PhaseStatus PhaseStatus { get; set; }
        public int PhaseStatusId { get; set; }
    }
}