using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using INF370.Group6.API.Layers.Core.Phases;

namespace INF370.Group6.API.Layers.Core.Equipments
{
    public class Checkout_CheckinDate
    {
        [Key]  public int CheckoutDateId { get; set; }

    

        
        public DateTime CheckInDate { get; set; }
        public DateTime CheckoutDate { get; set; }

        public virtual Task Tasks { get; set; }
        public int TaskId { get; set; }



        public virtual Equipment Equipments { get; set; }
        public int EquipmentId { get; set; }

        public virtual Checkout_CheckIn Checkout_CheckIn { get; set; }
        public int CheckoutId { get; set; }
    }


}
