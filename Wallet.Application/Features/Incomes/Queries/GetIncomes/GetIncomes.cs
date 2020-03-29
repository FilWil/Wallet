using MediatR;
using Wallet.Application.Features.Incomes.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Incomes.Queries.GetIncomes
{
    public class GetIncomes : IRequest<RequestResult<IncomeDto>>
    {
    }
}
