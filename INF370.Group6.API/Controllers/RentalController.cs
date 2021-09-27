using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core;
using INF370.Group6.API.Layers.Core.Identity;
using INF370.Group6.API.Layers.Core.Projects;
using INF370.Group6.API.Layers.Core.Projects.ProjectStatuses;
using INF370.Group6.API.Layers.Data.Context;
using INF370.Group6.API.Layers.Services.Dtos.ProjectAndPhaseDtos;
using INF370.Group6.API.Layers.Services.Dtos.ProjectsDtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using INF370.Group6.API.Layers.Services.Dtos.Rentals;
using INF370.Group6.API.Layers.Core.Rental;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        public RentalController(
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
        #region Rental Statuses

        [HttpPost("Statuses/Add/{username}")]
        public async Task<IActionResult> AddRentalStatus(AddorUpdateRentalDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.RentalStatuses.FirstOrDefault(item =>
                    string.Equals(item.StatusType.ToLower(), model.RentalStatusType.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: Rental status  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new RentalStatus()
                {
                    StatusType = model.RentalStatusType,
                   

                };

                await _context.RentalStatuses.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("Statuses/Update/{username}/{id}")]
        public async Task<IActionResult> UpdateRentalStatus(AddorUpdateRentalDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.RentalStatuses.FirstOrDefault(item => item.Id == id);


                if (recordInDb == null)
                {
                    message = "Error: Rental Status not found.";
                    return BadRequest(new { message });
                }

                recordInDb.StatusType = model.RentalStatusType;
            
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpDelete("Statuses/Delete/{username}/{id}")]
        public async Task<IActionResult> DeleteRentalStatus(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.RentalStatuses.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var employeeTypes = _context.Rentals.Where(item => item.RentalStatusId == recordInDb.Id);
                _context.Rentals.RemoveRange(employeeTypes);
                await _context.SaveChangesAsync();


                _context.RentalStatuses.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("Statuses/GetAll")]
        public ActionResult<IEnumerable<GetRentalStatusDto>> GetAllRentalStatuses()
        {
            var records = _context.RentalStatuses
                .Select(item => new GetRentalStatusDto
                {
                    Id = item.Id,
                    StatusType = item.StatusType,
                   

                }).OrderBy(item => item.StatusType).ToList();

            return records;
        }


        #endregion

        //Rentals


        [HttpPost("Statuses/Add/{username}")]
        public async Task<IActionResult> AddRental(AddorUpdateRentalDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.Rentals.FirstOrDefault(item =>
                    string.Equals(item.RentalName.ToLower(), model.RentalName.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: Rental status  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Rental()
                {
                    RentalName = model.RentalName,
                    RentalStatusType = model.RentalStatusType,
                    RentalStatusId = model.RentalStatusId,
                    Rental_Cost = model.Rental_Cost,
                    RentalRequestId = model.RentalRequestId,

            };

                await _context.Rentals.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("Statuses/Update/{username}/{id}")]
        public async Task<IActionResult> UpdateRental(AddorUpdateRentalDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Rentals.FirstOrDefault(item => item.Id == id);


                if (recordInDb == null)
                {
                    message = "Error: Rentals not found.";
                    return BadRequest(new { message });
                }

                recordInDb.RentalName = model.RentalName;
                recordInDb.RentalStatusType = model.RentalStatusType ;
                recordInDb.RentalStatusId = model.RentalStatusId;
                recordInDb.Rental_Cost = model.Rental_Cost;
                recordInDb.RentalRequestId = model.RentalRequestId;

                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        //[HttpDelete("Statuses/Delete/{username}/{id}")]
        //public async Task<IActionResult> DeleteRentalStatus(string username, int id)
        //{
        //    var message = "";
        //    if (ModelState.IsValid)
        //    {
        //        var recordInDb = _context.RentalStatuses.FirstOrDefault(item => item.Id == id);

        //        if (recordInDb == null)
        //        {
        //            message = "Error: Record not found.";
        //            return BadRequest(new { message });
        //        }


        //        var employeeTypes = _context.Rentals.Where(item => item.RentalStatusId == recordInDb.Id);
        //        _context.Rentals.RemoveRange(employeeTypes);
        //        await _context.SaveChangesAsync();


        //        _context.RentalStatuses.Remove(recordInDb);
        //        await _context.SaveChangesAsync();

        //        return Ok();

        //    }

        //    message = "Error: Something went wrong on your side.";
        //    return BadRequest(new { message });
        //}

        [HttpGet("Statuses/GetAll")]
        public ActionResult<IEnumerable<GetRentalDto>> GetAllRentals()
        {
            var records = _context.Rentals
                .Select(item => new GetRentalDto
                {
                    Id = item.Id,
                    
                    RentalStatusId = item.RentalStatusId,
                    RentalName=item.RentalName,
                    Rental_Cost = item.Rental_Cost,
                    RentalStatusType= item.RentalStatusType,
                    RentalRequestId=item.RentalRequestId,


                }).OrderBy(item => item.RentalName).ToList();

            return records;
        }


        //Rental Request

        [HttpPost("Statuses/Add/{username}")]
        public async Task<IActionResult> AddRentalRequest(AddRentalRequestDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.RentalRequests.FirstOrDefault(item =>
                    string.Equals(item.RentalItem.ToLower(), model.RentalItem.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: Rental request  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new RentalRequest()
                {
                    RentalItem = model.RentalItem,
                    Id = model.Id,            
                    RentalRequestStatusId = model.RentalRequestStatusId,
                    RequestDate = model.RequestDate,
                    Quantity=model.Quantity,

                };

                await _context.RentalRequests.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }




    }
}
