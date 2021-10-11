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
using INF370.Group6.API.Layers.Core.Equipments;
using INF370.Group6.API.Layers.Services.Dtos.Authentication;
using INF370.Group6.API.Layers.Services.Dtos.EquipmentDto;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        public EquipmentController(
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
        public async Task<IActionResult> AddEquipment(AddorUpdateEquipmentDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Equipments.FirstOrDefault(item =>
                    string.Equals(item.EquipmentName.ToLower(), model.EquipmentName.ToLower()));

                if (recordInDb != null)
                {
                    message = "Error: Client name  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Equipment()
                {
                    EquipmentName = model.EquipmentName,
                    EquipmentDescription = model.EquipmentDescription,
                    EquipmentCondition = model.EquipmentCondition,
                    Quantity = model.Quantity,
                 


                };

                await _context.Equipments.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("{username}/{equipmentId}")]
        public async Task<IActionResult> UpdateEquipment(AddorUpdateEquipmentDto model, string username, int equipmentId)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Equipments.FirstOrDefault(item => item.Id == equipmentId);


                if (recordInDb == null)
                {
                    message = "Error: Client not found  already exist.";
                    return BadRequest(new { message });
                }

                recordInDb.EquipmentName = model.EquipmentName;
                recordInDb.EquipmentDescription = model.EquipmentDescription;
                recordInDb.EquipmentCondition = model.EquipmentCondition;
                recordInDb.Quantity = model.Quantity;
              


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
        public ActionResult<IEnumerable<GetEquipmentDto>> GetEquipment()
        {
            var employeeTypesInDb = _context.Equipments

                .OrderBy(item => item.EquipmentName)
                .Select(item => new GetEquipmentDto
                {
                    EquipmentId = item.Id,
                    EquipmentName = item.EquipmentName,
                    EquipmentCondition = item.EquipmentCondition,
                    EquipmentDescription = item.EquipmentDescription,
                    Quantity = item.Quantity,
                    


                }).OrderBy(item => item.EquipmentName).ToList();

            return employeeTypesInDb;
        }


        [HttpDelete("Equipment/Delete/{username}/{id}")]
        public async Task<IActionResult> DeleteEquipment(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Equipments.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var employeeTypes = _context.Equipments.Where(item => item.Id == recordInDb.Id);
                _context.Equipments.RemoveRange(employeeTypes);
                await _context.SaveChangesAsync();


                _context.Equipments.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

    }

}

