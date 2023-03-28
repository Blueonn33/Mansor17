namespace Mansor.Controllers
{
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

    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IEmailService _emailService;
        private readonly UserManager<User> _userManager;

        public UserController(IUsersService userService, IEmailService emailService, UserManager<User> userManager)
        {
            _usersService = userService;
            _emailService = emailService;
            _userManager = userManager;
        }

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

        [HttpDelete]
        [Route("api/delete/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            var targetUser = await _usersService.GetUserByIdAsync(id);
            if (targetUser == null)
            {
                return NotFound("User doesn't exist");
            }
            if (targetUser.IsDeleted)
            {
                return BadRequest("User is already deleted");
            }
            await _usersService.DeleteAsync(targetUser);

            return Ok(targetUser);
        }
    }
}