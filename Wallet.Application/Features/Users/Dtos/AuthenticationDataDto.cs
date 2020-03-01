namespace Wallet.Application.Features.Users.Dtos
{
    public class AuthenticationDataDto
    {
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
    }
}
