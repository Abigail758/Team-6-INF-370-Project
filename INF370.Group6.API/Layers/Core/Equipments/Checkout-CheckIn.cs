using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Core.Equipments
{
    public class Checkout_CheckIn


    {
        [Key] public int CheckoutId { get; set; }
        public string CheckoutEquip { get; set; }

        public string CheckInEquip { get; set; }
        public virtual List<Checkout_CheckinDate> Checkout_CheckinDates { get; set; }

        public Checkout_CheckIn()
        {
            Checkout_CheckinDates = new List<Checkout_CheckinDate>();
        }
    }
}
