// Written by Brian McCarthy
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
}
