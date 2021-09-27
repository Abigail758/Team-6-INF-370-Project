using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.Supplier
{
    public class SupplierRequest
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(500)]

        public string ItemName { get; set; }
        [Required]
        [MaxLength(500)]

        public int Quantity { get; set; }

        public DateTime Date { get; set; }
    }
}
