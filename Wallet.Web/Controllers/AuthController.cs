using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallet.Application.Interfaces;
using Wallet.Application.Models;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;

namespace Wallet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthService authService;
        IUserRepository userRepository;
        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            this.authService = authService;
            this.userRepository = userRepository;
        }

        [HttpPost("register")]
        public ActionResult<AuthenticationData> Post([FromBody]Model model)
        {
            var id = Guid.NewGuid().ToString();
            var user = new User
            {
                Id = id,
                Username = model.username,
                Email = model.email,
                Password = authService.HashPassword(model.password)
            };
            userRepository.Add(user);
            userRepository.SaveChanges();

            return authService.GetAuthenticationData(id);
        }

        public class Model
        {
            public string username;
            public string email;
            public string password;
        }
    }
}
