namespace Wallet.Application.Features.Users.Dtos
{
    public class RegistrationDataDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsRegistered { get; set; }

        public RegistrationDataDto(string username, string email, bool isRegistered)
        {
            Username = username;
            Email = email;
            IsRegistered = isRegistered;
        }
    }
}
