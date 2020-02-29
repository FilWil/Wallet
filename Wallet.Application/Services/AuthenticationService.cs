using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CryptoHelper;
using Microsoft.IdentityModel.Tokens;
using Wallet.Application.Interfaces;
using Wallet.Application.Models;

namespace Wallet.Application.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private string TokenSecret { get; }
        private int TokenLifespan { get; }
        
        public AuthenticationService(string tokenSecret, int tokenLifespan)
        {
            TokenSecret = tokenSecret;
            TokenLifespan = tokenLifespan;
        }
        
        public AuthenticationData GetAuthenticationData(string userId)
        {
            var tokenExpirationTime = DateTime.Now.AddSeconds(TokenLifespan);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userId),
                }),
                Expires = tokenExpirationTime,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenSecret)),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return new AuthenticationData()
            {
                Id = userId,
                Token = token,
                TokenExpirationTime = ((DateTimeOffset) tokenExpirationTime).ToUnixTimeSeconds()
            };
        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string hash, string password)
        {
            return Crypto.VerifyHashedPassword(hash, password);
        }
    }
}