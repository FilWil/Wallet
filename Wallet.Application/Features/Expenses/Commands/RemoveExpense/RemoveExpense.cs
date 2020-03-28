using MediatR;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Expenses.Commands.RemoveExpense
{
    public class RemoveExpense : IRequest<RequestResult<Unit>>
    {
        public string ExpenseId { get; set; }
    }
}
