using System;
using System.ComponentModel.DataAnnotations;
using INF370.Group6.API.Layers.Core.Phases;

using INF370.Group6.API.Layers.Core.Equipments;
using System.Collections.Generic;

namespace INF370.Group6.API.Layers.Core.Tasks
{
    public class Task
    {
        [Key] public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual Phase Phase { get; set; }
        public int PhaseId { get; set; }

        public virtual TaskStatus TaskStatus { get; set; }
        public int TaskStatusId { get; set; }

        // bridge table 
     
        public ICollection<Equipment> Equipment { get; set; }
    }
}


