using Wallet.Application.Dtos;

namespace Wallet.Application.Features.Users.Dtos
{
    public class HistoricalBalanceDto : BaseEntityDto
    {
        public double BalanceValue { get; set; }
    }
}
