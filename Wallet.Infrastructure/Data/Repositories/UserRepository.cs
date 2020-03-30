using Microsoft.EntityFrameworkCore;
using System.Linq;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;
using Wallet.Infrastructure.Data.Context;

namespace Wallet.Infrastructure.Data.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(WalletDbContext context) : base(context) { }

        public IQueryable<User> GetAllWithCollections()
        {
            return GetAll()
                .Include(u => u.Incomes)
                .Include(u => u.Expenses)
                .Include(u => u.Goals);
        }
    }
}
