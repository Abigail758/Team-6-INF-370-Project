using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.SupplierTypesDto
{
    public class AddUpdateSupplierTypeDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

    }
}
