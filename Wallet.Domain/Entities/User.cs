
using Wallet.Domain.Core.Models;

namespace Wallet.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
