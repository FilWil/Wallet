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
}