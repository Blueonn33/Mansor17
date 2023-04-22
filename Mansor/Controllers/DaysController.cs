using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mansor.Data.Models;
using Mansor.Business.Services.Interfaces;
using Mansor.Data;
using Microsoft.AspNetCore.Identity;
using Mansor.Models;

namespace Mansor.Controllers
{
    [ApiController]
    [Authorize]
    public class DaysController : ControllerBase
    {
        private readonly IDaysService _daysService;
        private readonly IUsersService _usersService;
        private readonly UserManager<User> _userManager;
        public DaysController(IDaysService daysService, IUsersService usersService,
            UserManager<User> userManager)
        {
            _daysService = daysService;
            _usersService = usersService;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("api/days")]
        public async Task<IEnumerable<Day>> GetAllDays()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return await _daysService.GetDaysAsync();
        }
    }
}