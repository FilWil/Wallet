using MediatR;
using Wallet.Application.Features.Users.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Users.Queries.GetUser
{
    public class GetUser : IRequest<RequestResult<UserDto>>
    {
        public string UserId { get; set; }
    }
}
