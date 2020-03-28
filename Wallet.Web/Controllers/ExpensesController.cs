using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wallet.Application.Features.Expenses.Commands.AddExpense;
using Wallet.Application.Features.Expenses.Commands.RemoveExpense;
using Wallet.Application.Features.Expenses.Queries;

namespace Wallet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBaseWithMediator
    {
        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody]AddExpense command)
        {
            var result = await Mediator.Send(command);

            return FromResult(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses ()
        {
            var query = new GetExpenses();
            var result = await Mediator.Send(query);

            return FromResult(result);
        }

        [HttpDelete("{expenseId}")]
        public async Task<IActionResult> RemoveExpense([FromRoute]string expenseId)
        {
            var command = new RemoveExpense
            {
                ExpenseId = expenseId
            };

            var result = await Mediator.Send(command);

            return FromResult(result);
        }
    }
}
