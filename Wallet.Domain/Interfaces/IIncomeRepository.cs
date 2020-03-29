using System.Linq;
using Wallet.Domain.Entities;

namespace Wallet.Domain.Interfaces
{
    public interface IIncomeRepository : IGenericRepository<Income>
    {
        public IQueryable<Income> GetAllWithUsers();
    }
}
