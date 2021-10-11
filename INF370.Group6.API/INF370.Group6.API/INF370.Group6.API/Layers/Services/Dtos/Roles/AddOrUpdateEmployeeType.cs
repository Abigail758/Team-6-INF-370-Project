using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.Roles
{
    public class AddOrUpdateEmployeeType
    {
       
        [Required]
        public string Name { get; set; } 
        
        [Required]
        public string Description { get; set; }


    }
}