using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wallet.Application.Features.Users.Commands.RegisterUser;
using Wallet.Application.Features.Users.Queries.LoginUser;

namespace Wallet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBaseWithMediator
    {
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody]RegisterUser command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
                return Ok(result.Item);
            else
                return NotFound(result.Message);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody]LoginUser query)
        {
            var result = await Mediator.Send(query);

            if (result.Success)
                return Ok(result.Item);
            else
                return NotFound(result.Message);
        }
    }
}
