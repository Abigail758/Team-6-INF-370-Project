using System;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.Tasks
{
    public class AddUpdateTaskDto
    {   public int Id { get; set; }
        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int PhaseId { get; set; }

        public int TaskStatusId { get; set; }
    }
}