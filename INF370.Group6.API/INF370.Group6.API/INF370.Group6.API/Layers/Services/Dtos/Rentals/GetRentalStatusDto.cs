using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INF370.Group6.API.Layers.Services.Dtos.Rentals
{
    public class GetRentalStatusDto
    {
        public int Id { get; set; }

        public string StatusType { get; set; }
    }
}
