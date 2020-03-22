using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var user = UserRepository
                .GetAll()
                .FirstOrDefault(u => u.Email == request.Email);

            if (user is null)
                return new RequestResult<AuthenticationDataDto>(false, new AuthenticationDataDto(null, 0, false), "User with provided email does not exists");

            if (!AuthService.VerifyPassword(user.Password, request.Password))
                return new RequestResult<AuthenticationDataDto>(false, new AuthenticationDataDto(null, 0, false), "Invalid password has been provided");

            var authDataDto = Mapper.Map<AuthenticationDataDto>(AuthService.GetAuthenticationData(user.Id));

            return new RequestResult<AuthenticationDataDto>(true, authDataDto, "Login was successful");
        }
    }
}
