using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INF370.Group6.API.Layers.Services.Dtos.TenderStatusDto
{
    public class GetTenderStatusDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
