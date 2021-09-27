using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INF370.Group6.API.Layers.Core.Tenders
{
    public class TenderStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<Tender> Tenders { get; set; }

        public TenderStatus()
        {
            Tenders = new List<Tender>();
        }
    }
}
