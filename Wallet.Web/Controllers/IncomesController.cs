using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wallet.Application.Features.Incomes.Commands.AddIncome;
using Wallet.Application.Features.Incomes.Commands.RemoveIncome;
using Wallet.Application.Features.Incomes.Queries.GetIncomes;

namespace Wallet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomesController : ControllerBaseWithMediator
    {
        [HttpPost]
        public async Task<IActionResult> AddIncome([FromBody]AddIncome command)
        {
            var result = await Mediator.Send(command);

            return FromResult(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetIncomes()
        {
            var query = new GetIncomes();
            var result = await Mediator.Send(query);

            return FromResult(result);
        }

        [HttpDelete("{expenseId}")]
        public async Task<IActionResult> RemoveIncome([FromRoute]string incomeId)
        {
            var command = new RemoveIncome
            {
                IncomeId = incomeId
            };

            var result = await Mediator.Send(command);

            return FromResult(result);
        }
    }
}
