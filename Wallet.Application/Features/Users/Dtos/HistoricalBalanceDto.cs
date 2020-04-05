using Wallet.Application.Dtos;

namespace Wallet.Application.Features.Users.Dtos
{
    public class HistoricalBalanceDto : BaseEntityDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public double BalanceValue { get; set; }
    }
}
