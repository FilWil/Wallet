using System.Linq;
using Wallet.Domain.Entities;

namespace Wallet.Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        IQueryable<User> GetAllWithCollections();
    }
}
