using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core.Identity;
using INF370.Group6.API.Layers.Core.Phases;
using INF370.Group6.API.Layers.Core.Projects.ProjectStatuses;
using INF370.Group6.API.Layers.Data.Context;
using INF370.Group6.API.Layers.Services.Dtos.Phases;
using INF370.Group6.API.Layers.Services.Dtos.ProjectAndPhaseDtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhasesController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        public PhasesController(
            AppDbContext context,
            RoleManager<AppRole> roleManager,
            UserManager<AppUser> userManager,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        #region Phases Statuses

        [HttpPost("Statuses/Add/{username}")]
        public async Task<IActionResult> AddPhaseStatus(AddOrUpdateProjectAndPhaseStatusDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.PhaseStatuses.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: Project status  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new PhaseStatus()
                {
                    Name = model.Name,
                    Description = model.Description

                };

                await _context.PhaseStatuses.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("Statuses/Update/{username}/{id}")]
        public async Task<IActionResult> UpdatePhaseStatus(AddOrUpdateProjectAndPhaseStatusDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.PhaseStatuses.FirstOrDefault(item => item.Id == id);


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
        public async Task<IActionResult> DeletePhaseStatus(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.PhaseStatuses.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var records = _context.Phases.Where(item => item.PhaseStatusId == recordInDb.Id);
                _context.Phases.RemoveRange(records);
                await _context.SaveChangesAsync();


                _context.PhaseStatuses.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("Statuses/GetAll")]
        public ActionResult<IEnumerable<GetProjectAndPhaseStatusDto>> GetAllPhaseStatuses()
        {
            var records = _context.PhaseStatuses
                .Select(item => new GetProjectAndPhaseStatusDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description

                }).OrderBy(item => item.Name).ToList();

            return records;
        }

        #endregion

        #region Phases

        [HttpPost("{username}")]
        public async Task<IActionResult> AddPhase(AddUpdatePhaseDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var phaseInDb = _context.Phases
                    .Where(item=>item.ProjectId == model.ProjectId)
                    .FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (phaseInDb != null)
                {
                    message = "Error: Phase name already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Phase()
                {
                    Name = model.Name,
                    Description = model.Description,
                    PhaseStatusId = model.PhaseStatusId,
                    ProjectId = model.ProjectId,
                    StartDate = model.StartDate.AddHours(2),
                    EndDate = model.EndDate.AddHours(2)
                };

                await _context.Phases.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }


        [HttpPut("{username}/{id}")]
        public async Task<IActionResult> UpdatePhase(AddUpdatePhaseDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var phaseInDb = _context.Phases
                    .Where(item => item.ProjectId == model.ProjectId)
                    .FirstOrDefault(item => item.Id == id);

                if (phaseInDb == null)
                {
                    message = "Error: Phase not found.";
                    return BadRequest(new { message });
                }

                phaseInDb.Name = model.Name;
                phaseInDb.Description = model.Description;
                phaseInDb.PhaseStatusId = model.PhaseStatusId;
                phaseInDb.ProjectId = model.ProjectId;
                phaseInDb.StartDate = model.StartDate.AddHours(2);
                phaseInDb.EndDate = model.EndDate.AddHours(2);

                await _context.SaveChangesAsync();

                return Ok();
            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetPhaseDto>> GetAllPhases()
        {
            var employeeTypesInDb = _context.Phases
                .Include(item=>item.Project)
                .Include(item=>item.PhaseStatus)
                .Select(item => new GetPhaseDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    ProjectName = item.Project.Name,
                    ProjectId = item.Project.Id,
                    PhaseStatusName = item.PhaseStatus.Name,
                    PhaseStatusId = item.PhaseStatus.Id,
                    RawStartDate = item.StartDate,
                    RawEndDate = item.EndDate,
                    StartDate = item.StartDate.ToString("dd/MM/yyyy"),
                    EndDate = item.EndDate.ToString("dd/MM/yyyy"),
                    ProjectRawStartTime = item.Project.StartDate,
                    ProjectRawEndTime = item.Project.EndDate,
                }).OrderBy(item => item.Name).ToList();

            return employeeTypesInDb;
        }

        [HttpGet("Project/GetAll/{projectId}")]
        public ActionResult<IEnumerable<GetPhaseDto>> GetAllProjectPhases(int projectId)
        {
            var employeeTypesInDb = _context.Phases
                .Where(item=>item.ProjectId == projectId)
                .Include(item => item.Project)
                .Include(item => item.PhaseStatus)
                .Select(item => new GetPhaseDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    ProjectName = item.Project.Name,
                    ProjectId = item.Project.Id,
                    PhaseStatusName = item.PhaseStatus.Name,
                    PhaseStatusId = item.PhaseStatus.Id,
                    RawStartDate = item.StartDate,
                    RawEndDate = item.EndDate,
                    StartDate = item.StartDate.ToString("dd/MM/yyyy"),
                    EndDate = item.EndDate.ToString("dd/MM/yyyy"),
                    ProjectRawStartTime = item.Project.StartDate,
                    ProjectRawEndTime = item.Project.EndDate,
                }).OrderBy(item => item.Name).ToList();

            return employeeTypesInDb;
        }
        #endregion

    }
}
