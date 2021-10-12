using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core.Tender;
using System.ComponentModel.DataAnnotations;


namespace INF370.Group6.API.Layers.Core.Clients
{
    public class Client
    {


        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string ClientName { get; set; }

        [Required]
        [MaxLength(500)]
        public string ClientAddress { get; set; }

        [Required]
        [MaxLength(500)]
        public string ContactPerson { get; set; }

        [Required]
        [MaxLength(500)]
        public string TelephoneNumbers { get; set; }

        [Required]
        [MaxLength(500)]
        public string EmailAddress { get; set; }

        public virtual List<TenderRequest> TenderRequests { get; set; }

        public Client()
        {
            TenderRequests = new List<TenderRequest>();
        }

    }
}
