using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using Wallet.Application.Features.Expenses.Dtos;
using Wallet.Application.Features.Goals.Dtos;
using Wallet.Application.Features.Incomes.Dtos;
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
            config.CreateMap<User, UserDto>()
                .ForMember(r => r.BalanceValue, o => o.MapFrom(r => Math.Round(r.BalanceValue, 2)));

            config.CreateMap<AuthenticationData, AuthenticationDataDto>();

            config.CreateMap<Expense, ExpenseDto>();
            config.CreateMap<Income, IncomeDto>();
            config.CreateMap<Goal, GoalDto>();

            config.CreateMap<HistoricalBalance, HistoricalBalanceDto>()
                .ForMember(r => r.BalanceValue, o => o.MapFrom(r => Math.Round(r.BalanceValue, 2)));
        }
    }
}
