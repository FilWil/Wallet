using Wallet.Application.Dtos;

namespace Wallet.Application.Features.Goals.Dtos
{
    public class GoalDto : BaseEntityDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double TargetValue { get; set; }
    }
}
