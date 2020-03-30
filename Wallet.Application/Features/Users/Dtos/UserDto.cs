using System.Collections.Generic;
using Wallet.Application.Features.Expenses.Dtos;
using Wallet.Application.Features.Goals.Dtos;
using Wallet.Application.Features.Incomes.Dtos;

namespace Wallet.Application.Features.Users.Dtos
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }

        public double BalanceValue { get; set; }

        public ICollection<ExpenseDto> Expenses { get; set; }
        public ICollection<IncomeDto> Incomes { get; set; }
        public ICollection<GoalDto> Goals { get; set; }
    }
}
