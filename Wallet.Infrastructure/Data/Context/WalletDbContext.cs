using Microsoft.EntityFrameworkCore;
using Wallet.Domain.Entities;

namespace Wallet.Infrastructure.Data.Context
{
    public class WalletDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<HistoricalBalance> HistoricalBalances { get; set; }

        public WalletDbContext(DbContextOptions<WalletDbContext> options) : base(options)
        {

        }
    }
}