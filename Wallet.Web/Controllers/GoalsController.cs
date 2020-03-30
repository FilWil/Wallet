using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallet.Application.Features.Goals.Commands.AddGoal;
using Wallet.Application.Features.Goals.Commands.RemoveGoal;
using Wallet.Application.Features.Goals.Queries.GetGoals;

namespace Wallet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBaseWithMediator
    {
        [HttpPost]
        public async Task<IActionResult> AddGoal([FromBody]AddGoal command)
        {
            var result = await Mediator.Send(command);

            return FromResult(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetGoals()
        {
            var query = new GetGoals();
            var result = await Mediator.Send(query);

            return FromResult(result);
        }

        [HttpDelete("{goalId}")]
        public async Task<IActionResult> RemoveGoal([FromRoute]string goalId)
        {
            var command = new RemoveGoal
            {
                GoalId = goalId
            };

            var result = await Mediator.Send(command);

            return FromResult(result);
        }
    }
}
