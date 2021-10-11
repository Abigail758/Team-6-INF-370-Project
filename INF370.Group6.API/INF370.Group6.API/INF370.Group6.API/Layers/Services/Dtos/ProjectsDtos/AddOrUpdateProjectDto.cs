using System;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.ProjectsDtos
{
    public class AddOrUpdateProjectDto
    {

        public int ProjectStatusId { get; set; }

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
    }
}