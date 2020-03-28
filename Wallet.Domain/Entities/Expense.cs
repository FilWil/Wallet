using Wallet.Domain.Core.Models;

namespace Wallet.Domain.Entities
{
    public class Expense : BaseEntity
    {
        public string Id { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
