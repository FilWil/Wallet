using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Expenses.Commands.RemoveExpense
{
    public class RemoveExpenseHandler : IRequestHandler<RemoveExpense, RequestResult<double>>
    {
        private readonly IExpenseRepository ExpenseRepository;
        private readonly IUserRepository UserRepository;

        public RemoveExpenseHandler(IExpenseRepository expenseRepository, IUserRepository userRepository)
        {
            ExpenseRepository = expenseRepository;
            UserRepository = userRepository;
        }

        public async Task<RequestResult<double>> Handle(RemoveExpense request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<double>();

            var expense = ExpenseRepository
                .GetAllWithUsers()
                .FirstOrDefault(e => e.Id == request.ExpenseId);

            if (expense is null)
            {
                result.AddError($"Expense with id {request.ExpenseId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            if (expense.User is null)
            {
                result.AddError($"Expense is not related to any user", HttpStatusCode.NotFound);
                return result;
            }

            var user = UserRepository.GetById(expense.User.Id);

            user.BalanceValue += expense.Value;

            user.HistoricalBalances ??= new List<HistoricalBalance>();

            user.HistoricalBalances.Add(new HistoricalBalance()
            {
                Id = Guid.NewGuid().ToString(),
                BalanceValue = user.BalanceValue,
                CreatedAt = DateTime.UtcNow
            });

            ExpenseRepository.Remove(request.ExpenseId);
            UserRepository.Update(user);
            ExpenseRepository.SaveChanges();

            result.SetSingleItem(user.BalanceValue);

            return result;
        }
    }
}
