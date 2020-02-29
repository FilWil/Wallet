using Microsoft.EntityFrameworkCore;
using Wallet.Domain.Entities;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Reflection;
using System.IO;

namespace Wallet.Infrastructure.Data.Context
{
    public class WalletDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public WalletDbContext(DbContextOptions<WalletDbContext> options) : base(options)
        {

        }
    }

    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<WalletDbContext>
    {
        public WalletDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<WalletDbContext>();

            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile($"appsettings.{environment}.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("DatabaseConnection");

            builder.UseSqlServer(connectionString);

            return new WalletDbContext(builder.Options);
        }
    }
}