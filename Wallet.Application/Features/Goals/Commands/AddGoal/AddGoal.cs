using MediatR;
using Wallet.Application.Features.Goals.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Goals.Commands.AddGoal
{
    public class AddGoal : IRequest<RequestResult<GoalDto>>
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public double TargetValue { get; set; }
    }
}
