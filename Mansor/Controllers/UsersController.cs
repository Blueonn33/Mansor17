namespace Mansor.Controllers
{
    using Microsoft.AspNetCore.Components.Authorization;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.WebUtilities;
    using System.Text;
    using System.Text.Encodings.Web;
    using Mansor.Business.Services;
    using Mansor.Business.Services.Interfaces;
    using Mansor.Data.Models;
    using Mansor.Data.Repositories.Interfaces;
    using static Duende.IdentityServer.Models.IdentityResources;
    using Mansor.Data;
    using System.Security.Claims;

    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly AuthenticationStateProvider _authenticationStateProvider;
        private readonly IUsersService _usersService;
        private readonly IEmailService _emailService;
        private readonly UserManager<User> _userManager;

        public UserController(IUsersService userService, IEmailService emailService, UserManager<User> userManager,
            AuthenticationStateProvider authenticationStateProvider)
        {
            _usersService = userService;
            _emailService = emailService;
            _userManager = userManager;
            _authenticationStateProvider = authenticationStateProvider;
        }

        [HttpGet]
        [Route("api/user")]
        public async Task<IActionResult> GetUserById()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var userId = _usersService.GetCurrentUserId().Result;
            var targetUser = await _usersService.GetUserByIdAsync(userId);
            if (targetUser == null)
            {
                return NotFound();
            }
            return Ok(targetUser);
        }

        //[HttpGet]
        //[Route("api/user")]
        //public async Task<IActionResult> GetUserIdAsync()
        //{
        //    var authState = await _authenticationStateProvider.GetAuthenticationStateAsync();
        //    var userId = authState.User.FindFirstValue(ClaimTypes.NameIdentifier);

        //    return Ok(userId);
        //}

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _usersService.GetUserAsync();
        }

        [HttpGet]
        [Route("api/user/getName/{userId}")]
        public async Task<IActionResult> GetUserDataByUserId([FromRoute] string? userId)
        {
            if (userId == null)
            {
                return BadRequest("UserId must be not null!");
            }

            var userInfo = await _usersService.GetUserDataByUserId(userId);

            return userInfo == null ? BadRequest("User not found!") : Ok(userInfo);
        }

    }
}