using System.Collections.Generic;

namespace Wallet.Domain.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public ICollection<Expense> Expenses { get; set; }
        public ICollection<Income> Incomes { get; set; }
        public ICollection<Goal> Goals { get; set; }

        public Balance Balance { get; set; }
    }
}
