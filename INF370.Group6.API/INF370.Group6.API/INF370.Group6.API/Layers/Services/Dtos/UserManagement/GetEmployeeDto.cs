namespace INF370.Group6.API.Layers.Services.Dtos.UserManagement
{
    public class GetEmployeeDto
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public string Name { get; set; }
        public string IdNumber { get; set; }
        public string Surname { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string GeneratedPassword { get; set; }
        public string Address { get; set; }
        public string EmployeeType { get; set; }
        public int EmployeeId { get; set; }
    }
}