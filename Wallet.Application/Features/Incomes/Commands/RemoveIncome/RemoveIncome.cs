using MediatR;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Incomes.Commands.RemoveIncome
{
    public class RemoveIncome : IRequest<RequestResult<Unit>>
    {
        public string IncomeId { get; set; }
    }
}
