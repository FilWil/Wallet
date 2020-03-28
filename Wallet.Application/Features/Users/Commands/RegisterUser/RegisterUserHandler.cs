using AutoMapper;
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
    public class RegisterUserHandler : IRequestHandler<RegisterUser, RequestResult<RegistrationDataDto>>
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
        
        public async Task<RequestResult<RegistrationDataDto>> Handle(RegisterUser request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<RegistrationDataDto>();
            
            if (UserRepository.GetAll().FirstOrDefault(u => u.Email == request.Email) != null)
            {
                result.AddError($"Email {request.Email} is already used by another user");
                result.SetSingleItem(new RegistrationDataDto(null, null, false));
                return result;
            }

            if (UserRepository.GetAll().FirstOrDefault(u => u.Username == request.Username) != null)
            {
                result.AddError($"Username {request.Username} is already used by another user");
                result.SetSingleItem(new RegistrationDataDto(null, null, false));
                return result;
            }

            var newUser = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                Username = request.Username,
                Password = AuthService.HashPassword(request.Password)
            };

            UserRepository.Add(newUser);
            UserRepository.SaveChanges();

            var registrationDataDto = new RegistrationDataDto(newUser.Username, newUser.Email, true);

            result.SetSingleItem(registrationDataDto);
            return result;
        }
    }
}
