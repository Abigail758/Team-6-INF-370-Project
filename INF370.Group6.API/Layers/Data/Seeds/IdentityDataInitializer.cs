using System.Threading.Tasks;
using INF370.Group6.API.Layers.Core.Identity;
using Microsoft.AspNetCore.Identity;

namespace INF370.Group6.API.Layers.Data.Seeds
{
    public class IdentityDataInitializer
    {

        public static void SeedDatabase(
            UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            SeedRoles(roleManager).Wait();
            SeedUsers(userManager).Wait();
        }


        public static async Task SeedRoles(RoleManager<AppRole> roleManager)
        {
            var adminRoleExistsAsync = await roleManager.RoleExistsAsync("Admin".ToLower());

            if (!adminRoleExistsAsync)
            {
                var role = new AppRole()
                {
                    Name = "Admin".ToLower(),
                };

                await roleManager.CreateAsync(role);
            }
        }


        public static async Task SeedUsers(UserManager<AppUser> userManager)
        {
            var isAdminInDb = await userManager.FindByNameAsync("admin".ToLower());
            if (isAdminInDb == null)
            {
                var adminUser = new AppUser()
                {
                    UserName = "super".ToLower(),
                    Email = "super@gmail.com",
                    Name = "Super",
                    Surname = "Admin",
                    GeneratedPassword = "Super5050!"
                };

                var result = await userManager.CreateAsync(adminUser, "Super5050!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin".ToLower());
                }
            }
        }
    }

}