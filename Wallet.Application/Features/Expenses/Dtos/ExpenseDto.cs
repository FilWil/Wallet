using System;
using Wallet.Application.Dtos;

namespace Wallet.Application.Features.Expenses.Dtos
{
    public class ExpenseDto : BaseEntityDto
    {
        public string Id { get; set; }
        public double UserBalanceValue { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
