using System.Linq;
using Wallet.Domain.Entities;

namespace Wallet.Domain.Interfaces
{
    public interface IExpenseRepository : IGenericRepository<Expense>
    {
        public IQueryable<Expense> GetAllWithUsers();
    }
}
