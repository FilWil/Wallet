using System;
using Microsoft.Extensions.DependencyInjection;
using Wallet.Infrastructure.IoC;

namespace Wallet.Web.Configurations
{
    public static class DependencyInjectionSetup
    {
        public static void AddDependencyInjectionSetup(this IServiceCollection services)
        {
            if (services is null) throw new ArgumentException(nameof(services));
            
            DependencyInjectionContainer.RegisterServices(services);
        }
    }
}