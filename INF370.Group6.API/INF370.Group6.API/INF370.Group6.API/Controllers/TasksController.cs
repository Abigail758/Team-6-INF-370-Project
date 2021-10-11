using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Data.Context;
using INF370.Group6.API.Layers.Services.Dtos.ProjectAndPhaseDtos;
using INF370.Group6.API.Layers.Services.Dtos.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Task = INF370.Group6.API.Layers.Core.Tasks.Task;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        public TasksController(
            AppDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        #region Tasks Statuses

        [HttpPost("Statuses/Add/{username}")]
        public async Task<IActionResult> AddTaskStatus(AddOrUpdateProjectAndPhaseStatusDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var statusInDb = _context.TaskStatuses.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (statusInDb != null)
                {
                    message = "Error: status  already exist.";
                    return BadRequest(new { message });
                }

                var newRecord = new Layers.Core.Tasks.TaskStatus()
                {
                    Name = model.Name,
                    Description = model.Description

                };

                await _context.TaskStatuses.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("Statuses/Update/{username}/{id}")]
        public async Task<IActionResult> UpdateTaskStatus(AddOrUpdateProjectAndPhaseStatusDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.TaskStatuses.FirstOrDefault(item => item.Id == id);


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
        public async Task<IActionResult> DeleteTaskStatus(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.TaskStatuses.FirstOrDefault(item => item.Id == id);

                if (recordInDb == null)
                {
                    message = "Error: Record not found.";
                    return BadRequest(new { message });
                }


                var records = _context.Tasks.Where(item => item.TaskStatusId == recordInDb.Id);
                _context.Tasks.RemoveRange(records);
                await _context.SaveChangesAsync();


                _context.TaskStatuses.Remove(recordInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("Statuses/GetAll")]
        public ActionResult<IEnumerable<GetProjectAndPhaseStatusDto>> GetAllTaskStatuses()
        {
            var records = _context.TaskStatuses
                .Select(item => new GetProjectAndPhaseStatusDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description

                }).OrderBy(item => item.Name).ToList();

            return records;
        }

        #endregion

        #region Tasks

        [HttpPost("{username}")]
        public async Task<IActionResult> AddTask(AddUpdateTaskDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var phaseInDb = _context.Tasks
                    .Where(item => item.PhaseId == model.PhaseId)
                    .FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (phaseInDb != null)
                {
                    message = "Error: Task name already exist for phase.";
                    return BadRequest(new { message });
                }

                var newRecord = new Task()
                {
                    Name = model.Name,
                    Description = model.Description,
                    TaskStatusId = model.TaskStatusId,
                    PhaseId = model.PhaseId,
                    StartDate = model.StartDate.AddHours(2),
                    EndDate = model.EndDate.AddHours(2)
                };

                await _context.Tasks.AddAsync(newRecord);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }


        [HttpPut("{username}/{id}")]
        public async Task<IActionResult> UpdateTask(AddUpdateTaskDto model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var phaseInDb = _context.Tasks
                    .FirstOrDefault(item => item.Id == id);

                if (phaseInDb == null)
                {
                    message = "Error: Task not found.";
                    return BadRequest(new { message });
                }

                phaseInDb.Name = model.Name;
                phaseInDb.Description = model.Description;
                phaseInDb.TaskStatusId = model.TaskStatusId;
                phaseInDb.PhaseId = model.PhaseId;
                phaseInDb.StartDate = model.StartDate.AddHours(2);
                phaseInDb.EndDate = model.EndDate.AddHours(2);

          
                await _context.SaveChangesAsync();

                return Ok();
            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetTaskDto>> GetAllTasks()
        {
            var employeeTypesInDb = _context.Tasks
                .Include(item => item.Phase)
                .Include(item => item.TaskStatus)
                .Select(item => new GetTaskDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    PhaseName = item.Phase.Name,
                    PhaseId = item.Phase.Id,
                    TaskStatusName = item.TaskStatus.Name,
                    TaskStatusId = item.TaskStatus.Id,
                    RawStartDate = item.StartDate,
                    RawEndDate = item.EndDate,
                    StartDate = item.StartDate.ToString("dd/MM/yyyy"),
                    EndDate = item.EndDate.ToString("dd/MM/yyyy"),
                    PhaseRawStartDate = item.Phase.StartDate,
                    PhaseRawEndDate = item.Phase.EndDate
                }).OrderBy(item => item.Name).ToList();

            return employeeTypesInDb;
        }

        [HttpGet("Phase/GetAll/{phaseId}")]
        public ActionResult<IEnumerable<GetTaskDto>> GetAllPhaseTasks(int phaseId)
        {
            var employeeTypesInDb = _context.Tasks
                .Where(item=>item.PhaseId == phaseId)
                .Include(item => item.Phase)
                .Include(item => item.TaskStatus)
                .Select(item => new GetTaskDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    PhaseName = item.Phase.Name,
                    PhaseId = item.Phase.Id,
                    TaskStatusName = item.TaskStatus.Name,
                    TaskStatusId = item.TaskStatus.Id,
                    RawStartDate = item.StartDate,
                    RawEndDate = item.EndDate,
                    StartDate = item.StartDate.ToString("dd/MM/yyyy"),
                    EndDate = item.EndDate.ToString("dd/MM/yyyy"),
                    PhaseRawStartDate = item.Phase.StartDate,
                    PhaseRawEndDate = item.Phase.EndDate
                }).OrderBy(item => item.Name).ToList();

            return employeeTypesInDb;
        }
        #endregion

    }
}
