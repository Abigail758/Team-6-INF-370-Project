using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core.Clients;
using System.ComponentModel.DataAnnotations;

namespace INF370.Group6.API.Layers.Core.Tender
{
    public class Tender
    {
      
            public int Id { get; set; }
            [Required]
            [MaxLength(500)]
            public string TenderName { get; set; }
            [Required]
            [MaxLength(500)]
            public string Description { get; set; }
            public DateTime DateSubmitted { get; set; }

            public string TenderSource { get; set; }

            public int TenderStatusId { get; set; }
          
            public string TenderStatus { get; internal set; }

           public string AdvertisementDocument { get; set; }


            public virtual Client Client { get; set; }
             public int ClientId { get; set; }
    }
}

