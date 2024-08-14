import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };
  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.loginUser(this.loginData).subscribe(
      response => {
        console.log('Login response:', response);
        if (response.isSuccess) {
          // Save the token (you can also save it to localStorage or sessionStorage)
          localStorage.setItem('token', response.result.token);
          
          // Navigate to another page after successful login
          const role = response.result.user.role ? response.result.user.role.trim().toLowerCase() : '';

          if (role === 'admin') {
            // Navigate to admin dashboard
            this.router.navigate(['/admin-dashboard']); 
          } else {
            // Navigate to user dashboard
            this.router.navigate(['/dashboard']); 
          }
          
        } else {
          // Handle unsuccessful login
          alert(response.errorMessages.join(', ')); // You can replace this with a better UI notification
        }
      },
      error => {
        // Handle error response from API
        alert('Login failed: ' + error.message);
      }
    );
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

}
