using AutoMapper;
using MediatR;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Goals.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Goals.Commands.AddGoal
{
    public class AddGoalHandler : IRequestHandler<AddGoal, RequestResult<GoalDto>>
    {
        private readonly IGoalRepository GoalRepository;
        private readonly IUserRepository UserRepository;
        private readonly IMapper Mapper;

        public AddGoalHandler(IGoalRepository goalRepository, IUserRepository userRepository, IMapper mapper)
        {
            GoalRepository = goalRepository;
            UserRepository = userRepository;
            Mapper = mapper;
        }
        
        public async Task<RequestResult<GoalDto>> Handle(AddGoal request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<GoalDto>();

            var user = UserRepository
                .GetAllWithCollections()
                .FirstOrDefault(u => u.Id == request.UserId);

            if (user is null)
            {
                result.AddError($"User with id {request.UserId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            if (user.Goals.Count >= 3)
            {
                result.AddError("User already have maximum (3) goals, remove other to make storage", HttpStatusCode.Forbidden);
                return result;
            }

            var goal = new Goal()
            {
                Id = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow,
                Name = request.Name,
                TargetValue = request.TargetValue,
                User = user
            };

            GoalRepository.Add(goal);
            GoalRepository.SaveChanges();

            result.SetSingleItem(Mapper.Map<GoalDto>(goal));
            result.StatusCode = HttpStatusCode.OK;

            return result;
        }
    }
}
