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
using INF370.Group6.API.Layers.Core.Clients;
using INF370.Group6.API.Layers.Services.Dtos.Tenders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        public ClientsController(
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
        public async Task<IActionResult> AddClient(AddOrUpdateClientDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Clients.FirstOrDefault(item =>
                    string.Equals(item.ClientName.ToLower(), model.ClientName.ToLower()));

                if (recordInDb != null)
                {
                    message = "Error: Client name  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Client()
                {
                    ClientName = model.ClientName,
                    ClientAddress = model.ClientAddress,
                    ContactPerson = model.ContactPerson,
                    TelephoneNumbers = model.TelephoneNumbers,
                    EmailAddress = model.EmailAddress,


                };

                await _context.Clients.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("{username}/{clientid}")]
        public async Task<IActionResult> UpdateClient(AddOrUpdateClientDto model, string username, int clientid)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Clients.FirstOrDefault(item => item.Id == clientid);


                if (recordInDb == null)
                {
                    message = "Error: Client not found  already exist.";
                    return BadRequest(new { message });
                }

                recordInDb.ClientName = model.ClientName;
                recordInDb.ContactPerson = model.ContactPerson;
                recordInDb.TelephoneNumbers = model.TelephoneNumbers;
                recordInDb.ClientAddress = model.ClientAddress;
                recordInDb.EmailAddress = model.EmailAddress;


                await _context.SaveChangesAsync();

                return Ok();
            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });


        }


        //[HttpGet("GetbyId/{username}/{id}")]  
        //public ActionResult<IEnumerable<GetClientDto>> GetClient(string username, int id)
        //{

            

        //    var employeeTypesInDb = _context.Clients.FirstOrDefault(item => item.Id == id)
        //        {
        //            Id = item.Id,
        //            ClientName = item.ClientName,
        //            ClientAddress = item.ClientAddress,
        //            ContactPerson = item.ContactPerson,
        //            TelephoneNumbers = item.TelephoneNumbers,
        //            EmailAddress = item.EmailAddress,


        //        }).OrderBy(item => item.ClientName).ToList();

        //    return employeeTypesInDb;
        //}

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetClientDto>> GetAllClients()
        {
            var employeeTypesInDb = _context.Clients

                .OrderBy(item => item.ClientName)
                .Select(item => new GetClientDto
                {
                    Id = item.Id,
                    ClientName = item.ClientName,
                    ClientAddress = item.ClientAddress,
                    ContactPerson = item.ContactPerson,
                    TelephoneNumbers = item.TelephoneNumbers,
                    EmailAddress = item.EmailAddress,


                }).OrderBy(item => item.ClientName).ToList();

            return employeeTypesInDb;
        }


        [HttpDelete("Clients/Delete/{username}/{id}")]
        public async Task<IActionResult> DeleteClients(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Clients.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var employeeTypes = _context.Clients.Where(item => item.Id == recordInDb.Id);
                _context.Clients.RemoveRange(employeeTypes);
                await _context.SaveChangesAsync();


                _context.Clients.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

    }

   

}


