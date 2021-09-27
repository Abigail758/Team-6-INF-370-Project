using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using INF370.Group6.API.Layers.Core.Suppliers;

namespace INF370.Group6.API.Layers.Core.Supplier
{
    public class Supplier
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string Address { get; set; }

        public virtual SupplierType SupplierTypes { get; set; }

        public int SupplierTypeId { get; set; }
    }
}
