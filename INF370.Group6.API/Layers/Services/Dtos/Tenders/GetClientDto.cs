using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INF370.Group6.API.Layers.Services.Dtos.Tenders
{
    public class GetClientDto
    {
        public int Id { get; set; }

        public string ClientName { get; set; }

     
        public string ClientAddress { get; set; }

        public string ContactPerson { get; set; }


        public string TelephoneNumbers { get; set; }

        public string EmailAddress { get; set; }
    }
}
