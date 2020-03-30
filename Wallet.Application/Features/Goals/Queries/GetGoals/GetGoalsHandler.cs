using AutoMapper;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Goals.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Goals.Queries.GetGoals
{
    public class GetGoalsHandler : IRequestHandler<GetGoals, RequestResult<GoalDto>>
    {
        private readonly IGoalRepository GoalRepository;
        private readonly IMapper Mapper;

        public GetGoalsHandler(IGoalRepository goalRepository, IMapper mapper)
        {
            GoalRepository = goalRepository;
            Mapper = mapper;
        }
        
        public async Task<RequestResult<GoalDto>> Handle(GetGoals request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<GoalDto>();

            var goals = GoalRepository
               .GetAllWithUsers();

            result.SetCollection(Mapper.Map<List<GoalDto>>(goals));

            return result;
        }
    }
}
