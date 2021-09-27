using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Data.Context;
using INF370.Group6.API.Layers.Services.Dtos.ProjectAndPhaseDtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Tender = INF370.Group6.API.Layers.Core.Tenders.Tender;
using INF370.Group6.API.Layers.Services.Dtos.Tenders;
using INF370.Group6.API.Layers.Services.Dtos.TenderStatusDto;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TendersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        public TendersController(
            AppDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        #region Tender Statuses
        [HttpPost("Statuses/Add/{username}")]

        public async Task<IActionResult> AddTenderStatus(AddUpdateTenderStatusDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.TenderStatuses.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: status  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Layers.Core.Tenders.TenderStatus()
                {
                    Name = model.Name,
                    Description = model.Description

                };

                await _context.TenderStatuses.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        public async Task<IActionResult> UpdateTenderStatus(AddUpdateTenderStatusDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.TenderStatuses.FirstOrDefault(item => item.Id == id);


                if (recordInDb == null)
                {
                    message = "Error: Tender Status not found.";
                    return BadRequest(new { message });
                }

                recordInDb.Name = model.Name;
                recordInDb.Description = model.Description;
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }



        [HttpDelete("Statuses/Delete/{username}/{id}")]
        public async Task<IActionResult> DeleteTenderStatus(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.TenderStatuses.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var records = _context.Tenders.Where(item => item.TenderStatusId == recordInDb.Id);
                _context.Tenders.RemoveRange(records);
                await _context.SaveChangesAsync();


                _context.TenderStatuses.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("Statuses/GetAll")]
        public ActionResult<IEnumerable<GetTenderStatusDto>> GetAllTenderStatuses()
        {
            var records = _context.TenderStatuses
                .Select(item => new GetTenderStatusDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description

                }).OrderBy(item => item.Name).ToList();

            return records;
        }


        #endregion


        #region Tenders

        [HttpPost("{username}")]
        public async Task<IActionResult> AddTender(AddUpdateTenderDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var tenderInDb = _context.Tenders
                    .Where(item => item.Id == model.Id)
                    .FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (tenderInDb != null)
                {
                    message = "Error: Tender name already exist for tender.";
                    return BadRequest(new { message });
                }

                var newRecord = new Tender()
                {
                    Name = model.Name,
                    Description = model.Description,
                    TenderStatusId = model.TenderStatusId,
                    DateSubmitted = model.DateSubmitted.AddHours(2),
                    TenderSource = model.TenderSource

                };

                await _context.Tenders.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("{username}/{id}")]
        public async Task<IActionResult> UpdateTender(AddUpdateTenderDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var tenderInDb = _context.Tenders
                    .FirstOrDefault(item => item.Id == id);

                if (tenderInDb == null)
                {
                    message = "Error: Tender not found.";
                    return BadRequest(new { message });
                }

                tenderInDb.Name = model.Name;
                tenderInDb.Description = model.Description;
                tenderInDb.TenderStatusId = model.TenderStatusId;
                tenderInDb.DateSubmitted = model.DateSubmitted.AddHours(2);
                tenderInDb.TenderSource = model.TenderSource;


                await _context.SaveChangesAsync();

                return Ok();
            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }


        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetTenderDto>> GetAllTenders()
        {
            var tenderInDb = _context.Tenders
                .Include(item => item.Tenders)
                .Include(item => item.TenderStatusId)
                .Select(item => new GetTenderDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    TenderStatusName = item.TenderStatus,
                    TenderStatusId = item.TenderStatusId,
                    RawDateSubmitted = item.DateSubmitted,
                    DateSubmitted = item.DateSubmitted.ToString("dd/MM/yyyy"),
                    TenderSource = item.TenderSource
                }).OrderBy(item => item.Name).ToList();

            return tenderInDb;
        }


        #endregion
    }

} 
