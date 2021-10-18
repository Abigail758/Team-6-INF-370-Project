using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using INF370.Group6.API.Layers.Core.Clients;


namespace INF370.Group6.API.Layers.Services.Dtos.Tenders
{
    public class GetTender
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(500)]
        public string TenderName { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        public DateTime RawDateSubmitted { get; set; }
        public string DateSubmitted { get; set; }

        public string TenderSource { get; set; }

        public int TenderStatusId { get; set; }

        public string TenderStatusName { get; set; }

        public virtual Client Client { get; set; }
        public int ClientId { get; set; }
    }
}
