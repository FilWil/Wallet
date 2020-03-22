namespace Wallet.Application.Features.Users.Dtos
{
    public class AuthenticationDataDto
    {
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
        public bool IsAuthenticated { get; set; }

        public AuthenticationDataDto(string token, long tokenExpirationTime, bool isAuthenticated)
        {
            Token = token;
            TokenExpirationTime = tokenExpirationTime;
            IsAuthenticated = isAuthenticated;
        }
    }
}
