using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Users.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Users.Queries.GetUser
{
    public class GetUserHandler : IRequestHandler<GetUser, RequestResult<UserDto>>
    {
        private readonly IUserRepository UserRepository;
        private readonly IMapper Mapper;
        
        public GetUserHandler(IUserRepository userRepository, IMapper mapper)
        {
            UserRepository = userRepository;
            Mapper = mapper;
        }
        
        public async Task<RequestResult<UserDto>> Handle(GetUser request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<UserDto>();

            var user = UserRepository
                .GetAllWithCollections()
                .FirstOrDefault(u => u.Id == request.UserId);

            if (user is null)
            {
                result.AddError($"User with id {request.UserId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            user.BalanceValue = Math.Round(user.BalanceValue, 2);

            user.HistoricalBalances = user
                .HistoricalBalances
                .OrderBy(r => r.CreatedAt)
                .ToList();

            result.SetSingleItem(Mapper.Map<UserDto>(user));

            return result;
        }
    }
}
