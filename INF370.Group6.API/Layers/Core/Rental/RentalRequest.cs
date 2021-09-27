using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Core.Rental
{
    public class RentalRequest
    {
        public int Id { get; set; }
        public RentalRequestStatus RentalRequestStatus { get; set; }
        public int RentalRequestStatusId { get; set; }

        [Required]
        [MaxLength(250)]
        public string RentalItem { get; set; }

      
        public int Quantity { get; set; }

        public DateTime RequestDate { get; set; }
    }
}   
