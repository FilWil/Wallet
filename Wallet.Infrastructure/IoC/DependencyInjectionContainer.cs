using Microsoft.Extensions.DependencyInjection;
using Wallet.Application.Interfaces;
using Wallet.Application.Services;
using Wallet.Domain.Interfaces;
using Wallet.Infrastructure.Data.Context;
using Wallet.Infrastructure.Data.Repositories;

namespace Wallet.Infrastructure.IoC
{
    public class DependencyInjectionContainer
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}