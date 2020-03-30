using MediatR;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Goals.Commands.RemoveGoal
{
    public class RemoveGoalHandler : IRequestHandler<RemoveGoal, RequestResult<Unit>>
    {
        private readonly IGoalRepository GoalRepository;

        public RemoveGoalHandler(IGoalRepository goalRepository)
        {
            GoalRepository = goalRepository;
        }
        
        public async Task<RequestResult<Unit>> Handle(RemoveGoal request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<Unit>();

            var goal = GoalRepository
                .GetById(request.GoalId);

            if (goal is null)
            {
                result.AddError($"Goal with id {request.GoalId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            GoalRepository.Remove(request.GoalId);
            GoalRepository.SaveChanges();

            result.SetSingleItem(new Unit());

            return result;
        }
    }
}
