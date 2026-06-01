# User Management API

**Project Name**: User Management API
**Website Name**: TechHive API Viewer
**Written by**: Brian McCarthy

## Table of Contents
- [Project Name](#user-management-api)
- [Website Name](#user-management-api)
- [Requirements](#requirements)
- [Languages Used](#languages-used)
- [Technologies](#technologies)
- [Methodologies Used](#methodologies-used)
- [File Structure & Files](#file-structure--files)
- [Functions](#functions)
- [How to Use](#how-to-use)
- [Summary of Code Methodologies](#summary-of-code-methodologies)

## Requirements
- .NET 8.0 SDK
- IDE (e.g., Visual Studio, VS Code)
- API testing tool (Postman or Swagger UI)

## Languages Used
- C#
- TypeScript
- HTML/CSS 

## Technologies
- ASP.NET Core Web API
- .NET 8
- React (Vite)
- Tailwind CSS

## Methodologies Used
- RESTful API Design
- Middleware Pipeline Architecture (Authentication, Error Handling, Logging)
- Generative AI-Assisted Development (Microsoft Copilot)
- Mobile-First / Responsive UI Design

## File Structure & Files
- `UserManagementAPI/`
  - [`Program.cs`](./UserManagementAPI/Program.cs): Main application entry point and middleware configuration.
  - [`UserManagementAPI.csproj`](./UserManagementAPI/UserManagementAPI.csproj): Project configuration.
  - `Models/`
    - [`User.cs`](./UserManagementAPI/Models/User.cs): Data models with validation attributes.
  - `Controllers/`
    - [`UsersController.cs`](./UserManagementAPI/Controllers/UsersController.cs): API endpoints for CRUD operations.
  - `Middleware/`
    - [`AuthenticationMiddleware.cs`](./UserManagementAPI/Middleware/AuthenticationMiddleware.cs): Custom token-based authentication middleware.
    - [`ErrorHandlingMiddleware.cs`](./UserManagementAPI/Middleware/ErrorHandlingMiddleware.cs): Global exception handling middleware.
    - [`LoggingMiddleware.cs`](./UserManagementAPI/Middleware/LoggingMiddleware.cs): Request/Response logging middleware.
- `src/` (Web Viewer code)
  - `App.tsx`: Web UI entry point.
  - `csharp-code.ts`: Raw C# code files for display.

## Functions
- **GET `/api/users`**: Retrieve all users.
- **GET `/api/users/{id}`**: Retrieve a specific user by ID.
- **POST `/api/users`**: Create a new user.
- **PUT `/api/users/{id}`**: Update an existing user.
- **DELETE `/api/users/{id}`**: Remove a user.

## How to Use
1. Clone or download the repository to your local machine.
2. Navigate to the `UserManagementAPI` directory using your terminal.
3. Run `dotnet run` to start the backend application.
4. Navigate to `https://localhost:<port>/swagger` in your browser to interact with the API endpoints via Swagger UI.
5. Provide the Bearer token (`Bearer techhive-valid-secret`) in the Authorize section to access protected routes.

## Summary of Code Methodologies

This project employs a structured, modular approach to ASP.NET Core Web API development:

### 1. Model State Validation
Using Data Annotations in `User.cs` helps easily validate incoming JSON bodies before they reach the controller logic.
```csharp
[Required(ErrorMessage = "Name is required.")]
[StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
public string Name { get; set; } = string.Empty;
```
When `ModelState.IsValid` is evaluated inside `UsersController.cs`, it enforces these attributes constraints automatically.

### 2. Custom Middleware Pipeline
The middleware pipeline controls how HTTP requests and responses are processed in `Program.cs`. By extracting logic to independent pieces (Logging, Error handling, Auth), the system becomes highly modular.
```csharp
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseMiddleware<AuthenticationMiddleware>();
app.UseMiddleware<LoggingMiddleware>();
```
The order is critical here: Exceptions are caught first globally, Authentication protects routes, and Logging captures the incoming/outgoing requests last.

### 3. RESTful Controller Architecture
Using standard `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, and `[HttpDelete]` routing attributes enforces a clean REST architecture surface. 
```csharp
[HttpPost]
public ActionResult<User> AddUser([FromBody] User user)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    // ...
```
This maps standard HTTP Verbs to logical functions mapped with semantic response types.
