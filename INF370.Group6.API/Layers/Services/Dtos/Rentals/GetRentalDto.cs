using System;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Services.Dtos.Rentals
{
    public class GetRentalDto
    {
        public int RentalStatusId { get; set; }

        public string RentalStatusType { get; set; }
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string RentalName { get; set; }

        public int Rental_Cost { get; set; }


        public int RentalRequestId { get; set; }

    
     


     
    }

}
