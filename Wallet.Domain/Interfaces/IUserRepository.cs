using System;
using System.Collections.Generic;
using System.Text;
using Wallet.Domain.Entities;

namespace Wallet.Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
    }
}
