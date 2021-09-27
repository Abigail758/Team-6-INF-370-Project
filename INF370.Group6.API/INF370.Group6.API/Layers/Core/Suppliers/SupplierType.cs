using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INF370.Group6.API.Layers.Core.Suppliers
{
    public class SupplierType
    {
        public int SupplierTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<SupplierType> SupplierTypes { get; set; }

        public SupplierType()
        {
            SupplierTypes = new List<SupplierType>();
        }
    }
}
