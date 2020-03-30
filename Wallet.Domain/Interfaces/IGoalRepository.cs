using System.Linq;
using Wallet.Domain.Entities;

namespace Wallet.Domain.Interfaces
{
    public interface IGoalRepository : IGenericRepository<Goal>
    {
        public IQueryable<Goal> GetAllWithUsers();
    }
}
