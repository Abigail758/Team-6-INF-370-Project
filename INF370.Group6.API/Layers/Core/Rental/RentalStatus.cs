using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Core.Rental
{
    public class RentalStatus
    {
         public int Id { get; set; }
        
        [Required]
        [MaxLength(250)]
        public string StatusType { get; set; }

        public virtual List<Rental> Rentals { get; set; }

        public RentalStatus()
        {
            Rentals = new List<Rental>();
        }
    }
}
