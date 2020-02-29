using Wallet.Application.Models;

namespace Wallet.Application.Interfaces
{
    public interface IAuthenticationService
    {
        AuthenticationData GetAuthenticationData(string userId);        
        string HashPassword(string password);
        bool VerifyPassword(string hash, string password);
    }
}