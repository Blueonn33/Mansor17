using Mansor.Business.Services.Interfaces;
using Mansor.Data;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
    [ApiController]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly INotesService _notesService;
        private readonly IUsersService _usersService;
        private readonly UserManager<User> _userManager;

        public NotesController(INotesService notesService, IUsersService usersService, UserManager<User> userManager)
        {
            _notesService = notesService;
            _usersService = usersService;
            _userManager = userManager;
        }

        //[HttpGet]
        //[Route("api/notes")]
        //public async Task<IEnumerable<Note>> GetAllNotes()
        //{
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    return await _notesService.GetNotesAsync();
        //}

        [HttpGet]
        [Route("api/notes")]
        public async Task<IActionResult> GetAllNotes()
        {
            var userId = _usersService.GetCurrentUserId().Result;
            var notes = await _notesService.GetNotesByUserId(userId);

            if (!notes.Any())
            {
                return BadRequest("No existing notes!");
            }
            return Ok(notes);
        }

        [HttpGet]
        [Route("api/note/{id}")]
        public async Task<IActionResult> GetNoteById([FromRoute] int id)
        {
            var targetNote = await _notesService.GetNoteByIdAsync(id);
            if (targetNote == null)
            {
                return NotFound();
            }
            return Ok(targetNote);
        }

        //[HttpPost]
        //[Route("api/create/note")]
        //public async Task<IActionResult> CreateNote([FromBody] Note createNote)
        //{
        //    var note = await _notesService.GetNoteByTitleAsync(createNote.Title);

        //    if (note != null)
        //    {
        //        return BadRequest("The note already exists");
        //    }

        //    await _notesService.AddNoteAsync(createNote);
        //    return Ok(createNote);
        //}

        [HttpPost]
        [Route("api/create/note")]
        public async Task<IActionResult> CreateNote([FromBody] NoteRequestModel noteRequestModel)
        {
            var userId = _usersService.GetCurrentUserId().Result;
            var note = noteRequestModel.ToCreateNote(userId);
            var result = await _notesService.CreateNote(note);

            if (result == null)
            {
                return BadRequest("The note exists");
            }
            else
            {
                return Ok(result);
            }

        }

        [HttpDelete]
        [Route("api/delete/note/{id}")]

        public async Task<IActionResult> DeleteNote([FromRoute] int id)
        {
            var targetNote = await _notesService.GetNoteByIdAsync(id);
            if (targetNote == null)
            {
                return NotFound("Note doesn't exist");
            }
            await _notesService.DeleteAsync(targetNote);

            return Ok(targetNote);
        }
    }
}