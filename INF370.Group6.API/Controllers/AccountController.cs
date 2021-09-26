using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core.Identity;
using INF370.Group6.API.Layers.Services.Dtos.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace INF370.Group6.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("SignIn")]
        [AllowAnonymous]
        public async Task<ActionResult> SignIn([FromBody] SignInDto model)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Username.ToLower());

                var result = await _signInManager.PasswordSignInAsync(model.Username.ToLower(), model.Password, false, false);

                if (result.Succeeded)
                {
                    var token = GenerateJwtToken(user);
                    return Ok(new { token });
                }

                message = "Invalid username and/or password";
                return BadRequest(new { message });

            }

            message = "Something went wrong on your side. Please try again";
            return BadRequest(new { message });
        }

        private object GenerateJwtToken(AppUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            var claims = new List<Claim>
            {
                new Claim("UserName",user.UserName),
                new Claim("UserRole",roles[0].ToLower()),
                new Claim("DisplayName",user.Name),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
