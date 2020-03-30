using Microsoft.EntityFrameworkCore;
using System.Linq;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;
using Wallet.Infrastructure.Data.Context;

namespace Wallet.Infrastructure.Data.Repositories
{
    public class GoalRepository : GenericRepository<Goal>, IGoalRepository
    {
        public GoalRepository(WalletDbContext context) : base(context) { }

        public IQueryable<Goal> GetAllWithUsers()
        {
            return GetAll().Include(g => g.User);
        }
    }
}
