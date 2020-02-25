using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.EntityFrameworkCore;
using Wallet.Infrastructure.Data.Context;

namespace Wallet.API.Configurations
{
    public static class DatabaseSetup
    {
        public static void AddDatabaseSetup(this IServiceCollection services, IConfiguration configuration)
        {
            if (services is null) throw new ArgumentNullException(nameof(services));

            services.AddDbContext<WalletDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DatabaseConnection")));
        }
    }
}
