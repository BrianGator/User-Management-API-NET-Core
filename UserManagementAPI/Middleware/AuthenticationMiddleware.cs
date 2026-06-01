// Written by Brian McCarthy
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
}
