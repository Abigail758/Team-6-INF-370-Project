using Microsoft.AspNetCore.Http;
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

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        public ProjectsController(
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

        #region Project Statuses

        [HttpPost("Statuses/Add/{username}")]
        public async Task<IActionResult> AddProjectStatus(AddOrUpdateProjectAndPhaseStatusDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.ProjectStatuses.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: Project status  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new ProjectStatus()
                {
                    Name = model.Name,
                    Description = model.Description

                };

                await _context.ProjectStatuses.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("Statuses/Update/{username}/{id}")]
        public async Task<IActionResult> UpdateProjectStatus(AddOrUpdateProjectAndPhaseStatusDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.ProjectStatuses.FirstOrDefault(item => item.Id == id);


                if (recordInDb == null)
                {
                    message = "Error: Project Status not found.";
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
        public async Task<IActionResult> DeleteProjectStatus(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.ProjectStatuses.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var employeeTypes = _context.Projects.Where(item => item.Id == recordInDb.Id);
                _context.Projects.RemoveRange(employeeTypes);
                await _context.SaveChangesAsync();


                _context.ProjectStatuses.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("Statuses/GetAll")]
        public ActionResult<IEnumerable<GetProjectAndPhaseStatusDto>> GetAllProjectStatuses()
        {
            var records = _context.ProjectStatuses
                .Select(item => new GetProjectAndPhaseStatusDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description

                }).OrderBy(item => item.Name).ToList();

            return records;
        }


        #endregion

        #region Projects

        [HttpPost("{username}")]
        public async Task<IActionResult> AddProject(AddOrUpdateProjectDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Projects.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (recordInDb != null)
                {
                    message = "Error: Project name  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Project()
                {
                    Name = model.Name,
                    Description = model.Description,
                    EndDate = model.EndDate.AddHours(2),
                    StartDate = model.StartDate.AddHours(2),
                    ProjectStatusId = model.ProjectStatusId,
                    SiteAddress = model.SiteAddress,
                    SiteName = model.SiteName

                };

                await _context.Projects.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("{username}/{projectId}")]
        public async Task<IActionResult> UpdateProject(AddOrUpdateProjectDto model, string username, int projectId)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Projects.FirstOrDefault(item => item.ProjectStatusId == projectId);


                if (recordInDb == null)
                {
                    message = "Error: Project not found  already exist.";
                    return BadRequest(new { message });
                }

                recordInDb.Name = model.Name;
                recordInDb.Description = model.Description;
                recordInDb.EndDate = model.EndDate.AddHours(2);
                recordInDb.StartDate = model.StartDate.AddHours(2);
                recordInDb.ProjectStatusId = model.ProjectStatusId;
                recordInDb.SiteAddress = model.SiteAddress;
                recordInDb.SiteName = model.SiteName;

                await _context.SaveChangesAsync();

                return Ok();
            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetProjectDto>> GetAllProjects()
        {
            var employeeTypesInDb = _context.Projects
                .Include(item => item.ProjectStatus)
                .OrderBy(item => item.StartDate)
                .Select(item => new GetProjectDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    StartDate = item.StartDate.ToString("dd/MM/yyyy"),
                    RawStartDate = item.StartDate,
                    EndDate = item.EndDate.ToString("dd/MM/yyyy"),
                    RawEndDate = item.EndDate,
                    SiteAddress = item.SiteAddress,
                    SiteName = item.SiteName,
                    ProjectStatusName = item.ProjectStatus.Name,
                    ProjectStatusId = item.ProjectStatus.Id,

                }).OrderBy(item => item.Name).ToList();

            return employeeTypesInDb;
        }
        #endregion
    }
}
