using MediatR;
using Wallet.Application.Features.Users.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Expenses.Commands.RemoveExpense
{
    public class RemoveExpense : IRequest<RequestResult<double>>
    {
        public string ExpenseId { get; set; }
    }
}
