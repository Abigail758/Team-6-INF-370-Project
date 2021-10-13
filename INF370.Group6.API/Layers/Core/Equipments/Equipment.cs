using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Task = INF370.Group6.API.Layers.Core.Tasks.Task;

namespace INF370.Group6.API.Layers.Core.Equipments
{
    public class Equipment
    {
        [Key] public int  EquipmentId { get; set; }

        [Required]
        [MaxLength(250)]
        public string EquipmentName { get; set; }

        [Required]
        [MaxLength(250)]
        public string EquipmentDescription { get; set; }

        [Required]
        [MaxLength(250)]
        public string EquipmentCondition { get; set; }

        public int Quantity { get; set; }


        public ICollection<Task> Tasks{ get; set; }
    }
}
