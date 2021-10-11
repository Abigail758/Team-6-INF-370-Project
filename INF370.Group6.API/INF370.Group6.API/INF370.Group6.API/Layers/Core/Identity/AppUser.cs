using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace INF370.Group6.API.Layers.Core.Identity
{
    public class AppUser:IdentityUser
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string Surname { get; set; }

        [Required]
        [MaxLength(255)]
        public string GeneratedPassword { get; set; }

        public virtual Employee Employee { get; set; }

    }
}