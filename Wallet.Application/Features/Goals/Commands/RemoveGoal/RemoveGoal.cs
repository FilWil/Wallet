using MediatR;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Goals.Commands.RemoveGoal
{
    public class RemoveGoal : IRequest<RequestResult<Unit>>
    {
        public string GoalId { get; set; }
    }
}
