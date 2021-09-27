using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core;
using INF370.Group6.API.Layers.Core.Identity;
using INF370.Group6.API.Layers.Data.Context;
using INF370.Group6.API.Layers.Services.Dtos.Roles;
using INF370.Group6.API.Layers.Services.Dtos.UserManagement;
using INF370.Group6.API.Layers.Services.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        public EmployeesController(
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

        #region Employee Types

        [HttpPost("Types/Add/{username}")]
        public async Task<IActionResult> AddEmployeeType(AddOrUpdateEmployeeType model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var rolesInDb = _context.EmployeeTypes.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (rolesInDb != null)
                {
                    message = "Error: Employee type  already exist.";
                    return BadRequest(new { message });
                }

                var newRole = new EmployeeType()
                {
                    Name = model.Name,
                    Description = model.Description

                };

                await _context.EmployeeTypes.AddAsync(newRole);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("Types/Update/{username}/{id}")]
        public async Task<IActionResult> UpdateEmployeeType(AddOrUpdateEmployeeType model, string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var roleInDb = _context.EmployeeTypes.FirstOrDefault(item => item.Id == id);


                if (roleInDb == null)
                {
                    message = "Error: Employee Type not found.";
                    return BadRequest(new { message });
                }

                roleInDb.Name = model.Name;
                roleInDb.Description = model.Description;
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpDelete("Types/Delete/{username}/{id}")]
        public async Task<IActionResult> DeleteEmployeeType(string username, int id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var typeInDb = _context.EmployeeTypes.FirstOrDefault(item => item.Id == id);

                if (typeInDb == null)
                {
                    message = "Error: Type not found.";
                    return BadRequest(new { message });
                }


                var employeeTypes = _context.Employees.Where(item => item.EmployeeTypeId == typeInDb.Id);
                _context.Employees.RemoveRange(employeeTypes);
                await _context.SaveChangesAsync();


                _context.EmployeeTypes.Remove(typeInDb);
                await _context.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("Types/GetAll")]
        public ActionResult<IEnumerable<GetEmployeeTypeDto>> GetAllEmployeeTypes()
        {
            var employeeTypesInDb = _context.EmployeeTypes
                .Select(item => new GetEmployeeTypeDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description

                }).OrderBy(item => item.Name).ToList();

            return employeeTypesInDb;
        }


        #endregion

        [HttpPost("{username}")]
        public async Task<ActionResult> AddEmployee(AddEmployeeDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {

                var appUsers = _context.AppUsers
                    .FirstOrDefault(item =>
                        string.Equals(item.Email, model.EmailAddress) ||
                        string.Equals(item.PhoneNumber, model.PhoneNumber));

                if (appUsers == null)
                {

                    var emailExists = await _userManager.FindByEmailAsync(model.EmailAddress);
                    if (emailExists != null)
                    {
                        message = "Account with provided email address already exist.";
                        return BadRequest(new { message });
                    }

                    var assignedPassword = UserManagementExtensions.GenerateRandomPassword();
                    var appRole = await _roleManager.FindByNameAsync("Employee".ToLower());
                    if (appRole == null)
                    {
                        message = "Employee Role not found.";
                        return BadRequest(new { message });
                    }

                    var newUser = new AppUser()
                    {
                        UserName = model.EmailAddress,
                        Email = model.EmailAddress,
                        PhoneNumber = model.PhoneNumber,
                        Name = model.Name,
                        Surname = model.Surname,
                        GeneratedPassword = assignedPassword
                    };
                    var result = await _userManager.CreateAsync(newUser, assignedPassword);

                    if (result.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(newUser, appRole.Name);

                        var newEmployee = new Employee()
                        {
                            AppUserId = newUser.Id,
                            Address = model.Address,
                            IDNumber = model.IdNumber,
                            EmployeeTypeId = model.EmployeeTypeId

                        };
                        await _context.Employees.AddAsync(newEmployee);
                        await _context.SaveChangesAsync();

                        
                        //var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                        //var code = HttpUtility.UrlEncode(emailToken);

                        // var notificationExtenstion = new NotificationsExtension(_configuration);
                        //notificationExtenstion.NewStudentNotification(newStudent.Id);
                        return Ok();
                    }
                }

                message = "An account matching the provided details already exists.";
                return BadRequest(new { message });
            }
            message = "Something went wrong on your side. Please check your connection & try again.";
            return BadRequest(new { message });
        }

        [HttpPut("{username}/{employeeEmailAddress}")]
        public async Task<ActionResult> UpdateEmployee(UpdateEmployeeDto model, string username, string employeeEmailAddress)
        {
            var message = "";
            if (ModelState.IsValid)
            {

                    var appUserInDb = await _userManager.FindByEmailAsync(employeeEmailAddress);

                    appUserInDb.PhoneNumber = model.PhoneNumber;
                    appUserInDb.Name = model.Name;
                    appUserInDb.Surname = model.Surname;

                   var employeeInDb = _context.Employees.First(item => item.AppUserId == appUserInDb.Id);
                   employeeInDb.Address = model.Address;
                   employeeInDb.IDNumber = model.IdNumber;
                   employeeInDb.EmployeeTypeId = model.EmployeeTypeId;
                   employeeInDb.EmployeeTypeId = model.EmployeeTypeId;

                 await _context.SaveChangesAsync();

                return Ok();
            }
            message = "Something went wrong on your side. Please check your connection & try again.";
            return BadRequest(new { message });
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetEmployeeDto>> GetAllEmployees()
        {
            var recordsInDb = _context.Employees
                .Include(item => item.AppUser)
                .Include(item => item.EmployeeType)
                .Select(item => new GetEmployeeDto()
                {
                    Id = item.Id,
                    AppUserId = item.AppUserId,
                    Name = item.AppUser.Name,
                    Surname = item.AppUser.Surname,
                    IdNumber = item.IDNumber,
                    PhoneNumber = item.AppUser.PhoneNumber,
                    EmailAddress = item.AppUser.Email,
                   EmployeeType = item.EmployeeType.Name,
                   EmployeeId = item.EmployeeType.Id,
                   Address = item.Address,
                   GeneratedPassword = item.AppUser.GeneratedPassword
                }).OrderBy(item => item.Name).ToList();

            return recordsInDb;
        }
    }

    
}
