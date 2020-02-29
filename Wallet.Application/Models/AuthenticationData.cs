namespace Wallet.Application.Models
{
    public class AuthenticationData
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
    }
}