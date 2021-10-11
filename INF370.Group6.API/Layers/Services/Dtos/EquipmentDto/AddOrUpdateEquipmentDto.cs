using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INF370.Group6.API.Layers.Services.Dtos.EquipmentDto
{
    public class AddOrUpdateEquipmentDto
    {
        public int EquipmentId { get; set; }

      
        public string EquipmentName { get; set; }

      
        public string EquipmentDescription{ get; set; }

    
        public string EquipmentCondition { get; set; }

      
        public string Quantity { get; set; }
    }
}
