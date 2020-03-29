using Microsoft.EntityFrameworkCore;
using System.Linq;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;
using Wallet.Infrastructure.Data.Context;

namespace Wallet.Infrastructure.Data.Repositories
{
    public class IncomeRepository : GenericRepository<Income>, IIncomeRepository
    {
        public IncomeRepository(WalletDbContext context) : base(context) { }

        public IQueryable<Income> GetAllWithUsers()
        {
            return GetAll().Include(i => i.User);
        }
    }
}
