using MediatR;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Expenses.Commands.RemoveExpense
{
    public class RemoveExpenseHandler : IRequestHandler<RemoveExpense, RequestResult<Unit>>
    {
        private readonly IExpenseRepository ExpenseRepository;

        public RemoveExpenseHandler(IExpenseRepository expenseRepository)
        {
            ExpenseRepository = expenseRepository;
        }

        public async Task<RequestResult<Unit>> Handle(RemoveExpense request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<Unit>();

            var expense = ExpenseRepository
                .GetById(request.ExpenseId);

            if (expense is null)
            {
                result.AddError($"Expense with id {request.ExpenseId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            ExpenseRepository.Remove(request.ExpenseId);
            ExpenseRepository.SaveChanges();

            result.SetSingleItem(new Unit());

            return result;
        }
    }
}
