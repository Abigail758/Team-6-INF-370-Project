using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Data.Context;
using INF370.Group6.API.Layers.Services.Dtos.ProjectAndPhaseDtos;
using INF370.Group6.API.Layers.Services.Dtos.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Supplier = INF370.Group6.API.Layers.Core.Supplier.Supplier;
using INF370.Group6.API.Layers.Services.Dtos.SupplierTypesDto;
using INF370.Group6.API.Layers.Services.Dtos.Supplier;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        public SuppliersController(
            AppDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        #region Supplier Types
        [HttpPost("SupplierTypes/Add/{username}")]

        public async Task<IActionResult> AddSupplierType(AddUpdateSupplierTypeDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.SupplierTypes.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: Supplier type  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Layers.Core.Suppliers.SupplierType()
                {
                    Name = model.Name,
                    Description = model.Description

                };

                await _context.SupplierTypes.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("SupplierTypes/Update/{username}/{id}")]
        public async Task<IActionResult> UpdateSupplierType(AddUpdateSupplierTypeDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.SupplierTypes.FirstOrDefault(item => item.SupplierTypeId == id);


                if (recordInDb == null)
                {
                    message = "Error: Supplier type not found.";
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


        [HttpDelete("SupplierTypesDelete/{username}/{id}")]
        public async Task<IActionResult> DeleteSupplierType(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.SupplierTypes.FirstOrDefault(item => item.SupplierTypeId == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var records = _context.SupplierTypes.Where(item => item.SupplierTypeId == recordInDb.SupplierTypeId);
                _context.SupplierTypes.RemoveRange(records);
                await _context.SaveChangesAsync();


                _context.SupplierTypes.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }


        [HttpGet("SupplierTypes/GetAll")]
        public ActionResult<IEnumerable<GetSupplierTypeDto>> GetAllSupplierTypes()
        {
            var records = _context.SupplierTypes
                .Select(item => new GetSupplierTypeDto
                {
                    Id = item.SupplierTypeId,
                    Name = item.Name,
                    Description = item.Description

                }).OrderBy(item => item.Name).ToList();

            return records;
        }


        #endregion


        #region Suppliers

        [HttpPost("{username}")]
        public async Task<IActionResult> AddSupplier(AddUpdateSupplier model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Suppliers.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (recordInDb != null)
                {
                    message = "Error: Supplier name  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Supplier()
                {
                    Name = model.Name,
                    Email = model.Email,
                    Telephone = model.Telephone,
                    Address = model.Address,
                    SupplierTypeId = model.SupplierTypeId,
                };

                await _context.Suppliers.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("{username}/{projectId}")]
        public async Task<IActionResult> UpdateSupplier(AddUpdateSupplier model, string username, int Id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Suppliers.FirstOrDefault(item => item.Id == Id);


                if (recordInDb == null)
                {
                    message = "Error: Project not found  already exist.";
                    return BadRequest(new { message });
                }

                recordInDb.Name = model.Name;
                recordInDb.Email = model.Email;
                recordInDb.Telephone = model.Telephone;
                recordInDb.Address = model.Address;
                recordInDb.SupplierTypeId = model.SupplierTypeId;

                await _context.SaveChangesAsync();

                return Ok();
            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetSupplierDto>> GetAllSuppliers()
        {
            var supplierTypesInDb = _context.Suppliers
                .Include(item => item.SupplierTypeId)
                .OrderBy(item => item.SupplierTypes)
                .Select(item => new GetSupplierDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Email = item.Email,
                    Telephone = item.Telephone.ToString(),
                    Address = item.Address,
                    SupplierTypeName = item.SupplierTypes.Name,
                    SupplierTypeId = item.SupplierTypeId,

                }).OrderBy(item => item.Name).ToList();

            return supplierTypesInDb;
        }

        #endregion
    }
}
