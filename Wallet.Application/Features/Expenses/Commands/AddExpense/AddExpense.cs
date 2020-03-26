using MediatR;
using Wallet.Application.Features.Expenses.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Expenses.Commands.AddExpense
{
    public class AddExpense : IRequest<RequestResult<ExpenseDto>>
    {
        public string UserId { get; set; }
        public double Value { get; set; }
        public string Name { get; set; }
    }
}
