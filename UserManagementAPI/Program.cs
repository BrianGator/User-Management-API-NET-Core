// Written by Brian McCarthy
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

app.Run();
