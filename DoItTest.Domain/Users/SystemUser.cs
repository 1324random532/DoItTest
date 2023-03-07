namespace DoItTest.Domain.Users
{
    public class SystemUser
    {
        public Guid Id { get; }
        public String Login { get; }
        public UserRole Role { get; }

        public SystemUser(User user)
        {
            Id = user.Id;
            Login = user.Login;
            Role = user.Role;
        }
    }
}
