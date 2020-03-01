using MediatR;
using Wallet.Application.Features.Users.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Users.Commands.RegisterUser
{
    public class RegisterUser : IRequest<RequestResult<UserDto>>
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
