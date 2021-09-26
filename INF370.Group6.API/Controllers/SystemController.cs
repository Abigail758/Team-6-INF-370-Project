using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core;
using INF370.Group6.API.Layers.Core.Identity;
using INF370.Group6.API.Layers.Data.Context;
using INF370.Group6.API.Layers.Services.Dtos.Roles;
using Microsoft.AspNetCore.Identity;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public SystemController(
            AppDbContext appDbContext,
            RoleManager<AppRole> roleManager,
            UserManager<AppUser> userManager
        )
        {
            _appDbContext = appDbContext;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        #region App Roles

        [HttpPost("Roles/Add/{username}")]
        public async Task<IActionResult> AddRole(AddOrUpdateRoleDto model, string username)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var rolesInDb = _roleManager.Roles.FirstOrDefault(item =>
                    string.Equals(item.Name.ToLower(), model.Name.ToLower()));

                if (rolesInDb != null)
                {
                    message = "Error: Role name already exist.";
                    return BadRequest(new { message });
                }

                var newRole = new AppRole()
                {
                    Name = model.Name,
                };

                var result = await _roleManager.CreateAsync(newRole);

                if (result.Succeeded)
                {
                    return Ok();
                }

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("Roles/Update/{username}/{id}")]
        public async Task<IActionResult> UpdateRole(AddOrUpdateRoleDto model, string username, string id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var roleInDb = _roleManager.Roles.FirstOrDefault(item =>
                    string.Equals(item.Id.ToLower(), id.ToLower()));

                if (roleInDb == null)
                {
                    message = "Error: Role not found.";
                    return BadRequest(new { message });
                }

                roleInDb.Name = model.Name;
                await _appDbContext.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpDelete("Roles/Delete/{username}/{id}")]
        public async Task<IActionResult> DeleteRole(string username, string id)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var roleInDb = _roleManager.Roles.FirstOrDefault(item =>
                    string.Equals(item.Id.ToLower(), id.ToLower()));

                if (roleInDb == null)
                {
                    message = "Error: Role not found.";
                    return BadRequest(new { message });
                }

                var roleAppUsers = await _userManager.GetUsersInRoleAsync(roleInDb.Name);

                _appDbContext.AppUsers.RemoveRange(roleAppUsers);
                await _appDbContext.SaveChangesAsync();

                _appDbContext.AppRoles.Remove(roleInDb);
                await _appDbContext.SaveChangesAsync();

                return Ok();

            }

            message = "Error: Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("Roles/GetAll")]
        public ActionResult<IEnumerable<GetUserRoleDto>> GetAllUserRoles()
        {
            var userRolesInDb = _roleManager.Roles
                .Where(item => !string.Equals(item.Name.ToLower(), "admin".ToLower()))
                .Select(item => new GetUserRoleDto
                {
                    Id = item.Id,
                    Name = item.Name,
                }).OrderBy(item => item.Name).ToList();

            return userRolesInDb;
        }

        #endregion

     
    }
}
