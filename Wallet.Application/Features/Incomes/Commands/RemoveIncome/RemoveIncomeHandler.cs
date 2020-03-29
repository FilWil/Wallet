using MediatR;
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
        
        public RemoveIncomeHandler(IIncomeRepository incomeRepository)
        {
            IncomeRepository = incomeRepository;
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

            IncomeRepository.Remove(request.IncomeId);
            IncomeRepository.SaveChanges();

            result.SetSingleItem(new Unit());

            return result;
        }
    }
}
