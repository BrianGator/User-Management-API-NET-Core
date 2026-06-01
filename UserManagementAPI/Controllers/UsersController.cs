// Written by Brian McCarthy
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using UserManagementAPI.Models;

namespace UserManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // Simulated database for Activity 1 (CRUD endpoints)
        private static readonly List<User> _users = new List<User>();
        private static int _nextId = 1;

        // GET: api/users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(_users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);
            
            // Activity 2: Error handling for failed database lookups
            if (user == null)
            {
                return NotFound(new { error = $"User with ID {id} not found." });
            }
            
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public ActionResult<User> AddUser([FromBody] User user)
        {
            // ModelState is automatically validated thanks to [ApiController]
            // Activity 2: Add validation to ensure only valid data is processed.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user.Id = _nextId++;
            _users.Add(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { error = $"User with ID {id} not found." });
            }

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            
            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { error = $"User with ID {id} not found." });
            }

            _users.Remove(user);
            return NoContent();
        }
    }
}
