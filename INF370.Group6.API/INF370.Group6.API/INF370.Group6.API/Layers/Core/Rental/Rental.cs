using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace INF370.Group6.API.Layers.Core.Rental
{
    public class Rental
    {
        public int Id { get; set; }
      

        public RentalStatus RentalStatus { get; set; }
        public int RentalStatusId { get; set; }

        public string RentalStatusType { get; set; }
        [Required]
        [MaxLength(500)] 
        public string RentalName { get; set; }
    
        public int Rental_Cost { get; set; }

      
        public virtual RentalRequest RentalRequest { get; set; }
        public int RentalRequestId { get; set; }
    }
}
