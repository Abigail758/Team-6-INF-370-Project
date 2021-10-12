using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core.Clients;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Core.Tender
{
    public class TenderRequest
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string TenderName { get; set; }
        public string AdvertisementDocument { get; set; }

        public DateTime Date { get; set; }

        public virtual Client Client{ get; set; }
        public int ClientId { get; set; }


        ////
        ///


    }
}
