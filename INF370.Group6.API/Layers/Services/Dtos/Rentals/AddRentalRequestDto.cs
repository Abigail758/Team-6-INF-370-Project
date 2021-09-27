
using System;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.Rentals
{
    public class AddRentalRequestDto
    {
        public int Id { get; set; }
 
        public int RentalRequestStatusId { get; set; }

        public string RentalRequestStatusType { get; set; }

        [Required]
        [MaxLength(250)]
        public string RentalItem { get; set; }


        public int Quantity { get; set; }

        public DateTime RequestDate { get; set; }
    }
}
