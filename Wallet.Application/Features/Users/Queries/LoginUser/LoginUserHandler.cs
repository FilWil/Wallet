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
using Wallet.Application.Interfaces;
using Wallet.Application.Models;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Users.Queries.LoginUser
{
    public class LoginUserHandler : IRequestHandler<LoginUser, RequestResult<AuthenticationDataDto>>
    {
        private readonly IMapper Mapper;
        private readonly IAuthService AuthService;
        private readonly IUserRepository UserRepository;

        public LoginUserHandler(IMapper mapper, IAuthService authService, IUserRepository userRepository)
        {
            Mapper = mapper;
            AuthService = authService;
            UserRepository = userRepository;
        }

        public async Task<RequestResult<AuthenticationDataDto>> Handle(LoginUser request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<AuthenticationDataDto>();

            var user = UserRepository
                .GetAll()
                .FirstOrDefault(u => u.Email == request.Email);

            if (user is null)
            {
                result.AddError($"User with email {request?.Email} does not exists", HttpStatusCode.NotFound);
                result.SetSingleItem(new AuthenticationDataDto(null, 0, false));
            }

            if (!AuthService.VerifyPassword(user.Password, request.Password))
            {
                result.AddError("Invalid password has been provided");
                result.SetSingleItem(new AuthenticationDataDto(null, 0, false));
            }

            var authDataDto = Mapper.Map<AuthenticationDataDto>(AuthService.GetAuthenticationData(user.Id));

            result.SetSingleItem(authDataDto);
            return result;
        }
    }
}
