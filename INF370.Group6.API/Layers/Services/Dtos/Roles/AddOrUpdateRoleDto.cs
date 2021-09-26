using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.Roles
{
    public class AddOrUpdateRoleDto
    {
        [Required]
        public string Name { get; set; }
        
    }
}
