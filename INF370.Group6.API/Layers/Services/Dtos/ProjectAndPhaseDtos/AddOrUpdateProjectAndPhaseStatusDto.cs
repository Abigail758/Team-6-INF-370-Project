using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.ProjectAndPhaseDtos
{
    public class AddOrUpdateProjectAndPhaseStatusDto
    {
       
        [Required]
        public string Name { get; set; } 
        
        [Required]
        public string Description { get; set; }


    }
}