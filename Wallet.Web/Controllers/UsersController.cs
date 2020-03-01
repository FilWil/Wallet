using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wallet.Application.Features.Users.Commands.RegisterUser;

namespace Wallet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBaseWithMediator
    {
        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody]RegisterUser command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
                return Ok(result.Item);
            else
                return NotFound(result.Message);
        }
    }
}
