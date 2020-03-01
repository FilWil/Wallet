﻿using AutoMapper;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Users.Dtos;
using Wallet.Application.Interfaces;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Users.Commands.RegisterUser
{
    public class RegisterUserHandler : IRequestHandler<RegisterUser, RequestResult<UserDto>>
    {
        private readonly IMapper Mapper;
        private readonly IAuthService AuthService;
        private readonly IUserRepository UserRepository;
        
        public RegisterUserHandler(IMapper mapper, IAuthService authService, IUserRepository userRepository)
        {
            Mapper = mapper;
            AuthService = authService;
            UserRepository = userRepository;
        }
        
        public async Task<RequestResult<UserDto>> Handle(RegisterUser request, CancellationToken cancellationToken)
        {
            if (UserRepository.GetAll().FirstOrDefault(u => u.Email == request.Email) != null)
                return new RequestResult<UserDto>(false, null, "Email address is already used by another user");

            if (UserRepository.GetAll().FirstOrDefault(u => u.Username == request.Username) != null)
                return new RequestResult<UserDto>(false, null, "Username is already used by another user");

            var newUser = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                Password = request.Password,
                Username = request.Username
            };

            UserRepository.Add(newUser);
            UserRepository.SaveChanges();

            var userDto = Mapper.Map<UserDto>(newUser);

            return new RequestResult<UserDto>(true, userDto, "User has been registered");
        }
    }
}