// Written by Brian McCarthy
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
}
