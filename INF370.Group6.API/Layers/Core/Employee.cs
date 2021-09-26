using INF370.Group6.API.Layers.Core.Identity;

namespace INF370.Group6.API.Layers.Core
{
    public class Employee
    {
        public int Id { get; set; }
        public string IDNumber { get; set; }
        public string Address { get; set; }

        public virtual EmployeeType EmployeeType { get; set; }
        public int EmployeeTypeId { get; set; }

        public virtual AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
    }
}