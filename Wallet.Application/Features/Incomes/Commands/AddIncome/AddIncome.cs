using MediatR;
using Wallet.Application.Features.Incomes.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Incomes.Commands.AddIncome
{
    public class AddIncome : IRequest<RequestResult<IncomeDto>>
    {
        public string UserId { get; set; }
        public double Value { get; set; }
        public string Name { get; set; }
    }
}
