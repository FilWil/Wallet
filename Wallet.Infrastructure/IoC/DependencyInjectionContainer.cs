using Microsoft.Extensions.DependencyInjection;
using Wallet.Domain.Interfaces;
using Wallet.Infrastructure.Data.Context;
using Wallet.Infrastructure.Data.Repositories;

namespace Wallet.Infrastructure.IoC
{
    public static class DependencyInjectionContainer
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IExpenseRepository, ExpenseRepository>();

            services.AddScoped<WalletDbContext>();
        }
    }
}