using System;


namespace INF370.Group6.API.Layers.Services.Dtos.Rentals
{
    public class GetRentalRequestDto
    {
        public int Id { get; set; }
        public int RentalRequestStatusId { get; set; }

        public string RentalRequestStatusType { get; set; }

        public string RentalItem { get; set; }

        public int Quantity { get; set; }

        public DateTime RequestDate { get; set; }
    }
}
