using MediatR;
using Wallet.Application.Features.Users.Dtos;
using Wallet.Application.Models;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Users.Queries.LoginUser
{
    public class LoginUser : IRequest<RequestResult<AuthenticationDataDto>>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
