using Wallet.Application.Dtos;

namespace Wallet.Application.Features.Incomes.Dtos
{
    public class IncomeDto : BaseEntityDto
    {
        public string Id { get; set; }
        public double UserBalanceValue { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
