using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.UserManagement
{
    public class UpdateEmployeeDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
       
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string IdNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public int EmployeeTypeId { get; set; }
    }
}