using Wallet.Domain.Core.Models;

namespace Wallet.Domain.Entities
{
    public class HistoricalBalance : BaseEntity
    {
        public string Id { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }

        public double BalanceValue { get; set; }
    }
}
