using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Wallet.Application.Features.Users.Dtos;
using Wallet.Application.Models;
using Wallet.Domain.Entities;

namespace Wallet.Application.AutoMapper
{
    public static class AutoMapperConfiguration
    {
        public static void BuildMapper(IServiceCollection services)
        {
            var config = new MapperConfiguration(CreateMapper);
            var mapper = config.CreateMapper();

            services.AddSingleton(mapper);
            services.AddSingleton<IConfigurationProvider>(config);
        }

        private static void CreateMapper(IMapperConfigurationExpression config)
        {
            config.CreateMap<User, UserDto>();
            config.CreateMap<AuthenticationData, AuthenticationDataDto>();
        }
    }
}
