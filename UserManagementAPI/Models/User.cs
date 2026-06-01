// Written by Brian McCarthy
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
}
