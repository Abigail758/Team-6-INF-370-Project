using INF370.Group6.API.Layers.Core;
using INF370.Group6.API.Layers.Core.Identity;
using INF370.Group6.API.Layers.Core.Phases;
using INF370.Group6.API.Layers.Core.Projects;
using INF370.Group6.API.Layers.Core.Projects.ProjectStatuses;
using INF370.Group6.API.Layers.Core.Tasks;
using INF370.Group6.API.Layers.Core.Rental;
using INF370.Group6.API.Layers.Core.Tender;
using INF370.Group6.API.Layers.Core.Clients;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace INF370.Group6.API.Layers.Data.Context
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        private readonly IConfiguration _configuration;

        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration["ConnectionStrings:DefaultConnection"];

            optionsBuilder.UseSqlServer(connectionString);

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AppUser>()
                .HasOne(a => a.Employee)
               .WithOne(b => b.AppUser)
               .HasForeignKey<Employee>(b => b.AppUserId);

            
            base.OnModelCreating(builder);
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeType> EmployeeTypes { get; set; }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectStatus> ProjectStatuses { get; set; }
        public DbSet<Phase> Phases { get; set; }
        public DbSet<PhaseStatus> PhaseStatuses { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskStatus> TaskStatuses { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<RentalStatus> RentalStatuses { get; set; }
        public DbSet<RentalRequest> RentalRequests { get; set; }
        public DbSet<RentalRequestStatus> RentalRequestStatuses { get; set; }
        public DbSet<Client> Clients { get; set; }





    }
}