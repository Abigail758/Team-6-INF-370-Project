using System.Collections.Generic;

namespace INF370.Group6.API.Layers.Core
{
    public class EmployeeType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<Employee> Employees { get; set; }

        public EmployeeType()
        {
            Employees = new List<Employee>();
        }
    }
}