using System;

namespace Wallet.Application.Features.Expenses.Dtos
{
    public class ExpenseDto
    {
        public string Id { get; set; }
        public string UserUsername { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
