using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core;
using INF370.Group6.API.Layers.Core.Identity;
using INF370.Group6.API.Layers.Data.Context;
using Microsoft.AspNetCore.Identity;
using INF370.Group6.API.Layers.Core.Tender;
using INF370.Group6.API.Layers.Services.Dtos.Tenders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TendersController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        public TendersController(
            AppDbContext context,
            RoleManager<AppRole> roleManager,
            UserManager<AppUser> userManager,
            IConfiguration configuration)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
        }



        [HttpPost("{username}")]
        public async Task<IActionResult> AddTender(AddUpdateTenderDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Tenders.FirstOrDefault(item =>
                    string.Equals(item.TenderName.ToLower(), model.TenderName.ToLower()));

                if (recordInDb != null)
                {
                    message = "Error: Tender name  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Tender()
                {
                    TenderName = model.TenderName,
                    Description = model.Description,
                    DateSubmitted = model.DateSubmitted,
                    Client = model.Client,
                    ClientId= model.ClientId,
                    TenderSource = model.TenderSource,


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
                var recordInDb = _context.Tenders.FirstOrDefault(item => item.Id == id);


                if (recordInDb == null)
                {
                    message = "Error: Tender not found.";
                    return BadRequest(new { message });
                }

                recordInDb.TenderName = model.TenderName;
                recordInDb.Description = model.Description;
                recordInDb.DateSubmitted = model.DateSubmitted.AddHours(2);
                recordInDb.TenderSource = model.TenderSource;
                recordInDb.Client = model.Client;
                recordInDb.ClientId = model.ClientId;

                await _context.SaveChangesAsync();

                return Ok();
            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });


        }


        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetTender>> GetAllTenders()
        {
            var tenderTypesInDb = _context.Tenders

                .OrderBy(item => item.TenderName)
                .Select(item => new GetTender
                {
                    Id = item.Id,
                    TenderName = item.TenderName,
                    Description = item.Description,
                    DateSubmitted = item.DateSubmitted.ToString("dd/MM/yyyy"),
                    RawDateSubmitted = item.DateSubmitted,
                    TenderSource = item.TenderSource,
                    Client = item.Client,
                    ClientId = item.ClientId

                }).OrderBy(item => item.DateSubmitted).ToList();

            return tenderTypesInDb;
        }


        [HttpDelete("Clients/Delete/{username}/{id}")]
        public async Task<IActionResult> DeleteTenders(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Tenders.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var employeeTypes = _context.Tenders.Where(item => item.Id == recordInDb.Id);
                _context.Tenders.RemoveRange(employeeTypes);
                await _context.SaveChangesAsync();


                _context.Tenders.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }
    }
}
