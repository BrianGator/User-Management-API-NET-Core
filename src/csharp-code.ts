export const csharpFiles = {
  'Program.cs': `// Written by Brian McCarthy
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using UserManagementAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

// Activity 3: Middleware Pipeline Configuration
// Order is critical: Error Handling -> Authentication -> Logging

// 1. Global Error Handling Middleware
app.UseMiddleware<ErrorHandlingMiddleware>();

// 2. Authentication Middleware
app.UseMiddleware<AuthenticationMiddleware>();

// 3. Request/Response Logging Middleware
app.UseMiddleware<LoggingMiddleware>();

app.UseAuthorization();
app.MapControllers();

app.Run();`,
  'Models/User.cs': `// Written by Brian McCarthy
using System.ComponentModel.DataAnnotations;

namespace UserManagementAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        // Activity 2: Added validation to ensure only valid user data is processed
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        // Activity 2: Added validation for valid email
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;
    }
}`,
  'Controllers/UsersController.cs': `// Written by Brian McCarthy
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
}`,
  'Middleware/LoggingMiddleware.cs': `// Written by Brian McCarthy
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace UserManagementAPI.Middleware
{
    // Activity 3: Implement Logging Middleware
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;

        public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            var stopWatch = Stopwatch.StartNew();
            
            // Log incoming request details
            _logger.LogInformation($"[Incoming Request] Method: {context.Request.Method}, Path: {context.Request.Path}");

            await _next(context);

            stopWatch.Stop();
            
            // Log outgoing response details
            _logger.LogInformation($"[Outgoing Response] Status: {context.Response.StatusCode}, Time: {stopWatch.ElapsedMilliseconds}ms");
        }
    }
}`,
  'Middleware/ErrorHandlingMiddleware.cs': `// Written by Brian McCarthy
using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace UserManagementAPI.Middleware
{
    // Activity 3: Implement Error-Handling Middleware
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                // Catch unhandled exceptions
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            // Return consistent error responses in JSON format
            var result = JsonSerializer.Serialize(new { error = "Internal server error." });
            
            return context.Response.WriteAsync(result);
        }
    }
}`,
  'Middleware/AuthenticationMiddleware.cs': `// Written by Brian McCarthy
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace UserManagementAPI.Middleware
{
    // Activity 3: Implement Authentication Middleware
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Simple validation simulating token-based logic
            if (!context.Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("{\"error\": \"Unauthorized: Missing token.\"}");
                return;
            }

            var token = authHeader.ToString();
            
            // Simplistic token check for demonstration
            if (!token.StartsWith("Bearer ") || token.Length <= 7)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("{\"error\": \"Unauthorized: Invalid token format.\"}");
                return;
            }

            // In a real application, you would validate the JWT here.
            // For this assignment, we'll allow access to any user providing a valid token placeholder.
            var tokenValue = token.Substring("Bearer ".Length).Trim();
            if (tokenValue != "techhive-valid-secret")
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("{\"error\": \"Unauthorized: Invalid or expired token.\"}");
                return;
            }

            // Valid token, proceed down the pipeline
            await _next(context);
        }
    }
}`,
  'UserManagementAPI.csproj': `<!-- Written by Brian McCarthy -->
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
  </ItemGroup>

</Project>`
};
