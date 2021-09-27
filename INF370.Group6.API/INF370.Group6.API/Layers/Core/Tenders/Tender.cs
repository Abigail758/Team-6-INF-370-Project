using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using INF370.Group6.API.Layers.Core.Tenders;

namespace INF370.Group6.API.Layers.Core.Tenders
{
    public class Tender
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime DateSubmitted { get; set; }

        public string TenderSource { get; set; }

        public int TenderStatusId { get; set; }
        public virtual TenderStatus Tenders { get; set; }
        public string TenderStatus { get; internal set; }
    }
}
