using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Incomes.Commands.RemoveIncome
{
    public class RemoveIncomeHandler : IRequestHandler<RemoveIncome, RequestResult<Unit>>
    {
        private readonly IIncomeRepository IncomeRepository;
        private readonly IUserRepository UserRepository;

        public RemoveIncomeHandler(IIncomeRepository incomeRepository, IUserRepository userRepository)
        {
            IncomeRepository = incomeRepository;
            UserRepository = userRepository;
        }
        
        public async Task<RequestResult<Unit>> Handle(RemoveIncome request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<Unit>();

            var expense = IncomeRepository
                .GetById(request.IncomeId);

            if (expense is null)
            {
                result.AddError($"Income with id {request.IncomeId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            if (expense.User is null)
            {
                result.AddError($"Expense is not related to any user", HttpStatusCode.NotFound);
                return result;
            }

            var user = UserRepository.GetById(expense.User.Id);

            user.BalanceValue -= Math.Round(expense.Value, 2);

            IncomeRepository.Remove(request.IncomeId);
            UserRepository.Update(user);
            IncomeRepository.SaveChanges();

            result.SetSingleItem(new Unit());

            return result;
        }
    }
}
