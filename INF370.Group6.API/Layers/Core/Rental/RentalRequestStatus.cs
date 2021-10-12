using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Core.Rental
{
    public class RentalRequestStatus
    {

        public int Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Status_Type { get; set; }
        public virtual List<RentalRequest> RentalRequests { get; set; }

        public RentalRequestStatus()
        {
            RentalRequests = new List<RentalRequest>();
        }

    }
}
