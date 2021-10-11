using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core.Equipments;
using Task = INF370.Group6.API.Layers.Core.Tasks.Task;

namespace INF370.Group6.API.Layers.Core.Equipments
{
    public class TaskEquipment
    {
        [Key] public int EquipmentId { get; set; }

        public Equipment Equipment { get; set; }
        [Key] public int Id { get; set; }
        public Task Task { get; set; }

        public string CheckoutEquip { get; set; }

        public string CheckInEquip { get; set; }

        public int Quantity_Checkout { get; set; }

        public int Quantity_CheckIn { get; set; }
    }
}
