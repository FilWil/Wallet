using Microsoft.EntityFrameworkCore;
using Wallet.Domain.Entities;

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