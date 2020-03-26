using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;
using Wallet.Infrastructure.Data.Context;

namespace Wallet.Infrastructure.Data.Repositories
{
    public class ExpenseRepository : GenericRepository<Expense>, IExpenseRepository
    {
        public ExpenseRepository(WalletDbContext context) : base(context) { }
    }
}
