using System;

namespace Wallet.Domain.Core.Models
{
    public abstract class BaseEntity
    {
        public DateTime CreatedAt { get; set; }
    }
}
