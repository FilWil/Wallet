using MediatR;
using Wallet.Application.Features.Goals.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Goals.Queries.GetGoals
{
    public class GetGoals : IRequest<RequestResult<GoalDto>>
    { 
    }
}
