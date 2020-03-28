using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using Wallet.Domain.Core.Results;

namespace Wallet.Web.Controllers
{
    public class ControllerBaseWithMediator : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected IActionResult FromResult<T>(RequestResult<T> result)
        {
            return FromError(result) ?? Ok(result.GetResult());
        }

        protected IActionResult FromError<T>(RequestResult<T> result)
        {
            if (!result.IsSuccess)
            {
                if (result.StatusCode != null)
                    return StatusCode((int)result.StatusCode, result.GetResult());
                else
                    return StatusCode((int)HttpStatusCode.InternalServerError, result.GetResult());
            }

            return null;
        }
    }
}
