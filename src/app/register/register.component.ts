import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    userName: '',
    name: '',
    password: '',
    role: 'user'  // just a Default role
  };

  registrationError: string = '';
  registrationSuccess: string = '';

  constructor(private userService: UserService) {}

  onRegister(form: NgForm) {
    if (form.valid) {
      this.userService.registerUser(this.registerData).subscribe(
        response => {
          if (response.isSuccess) {
            this.registrationSuccess = 'Registration successful!';
            this.registrationError = '';
          }
          else {
            this.registrationSuccess = '';
            this.registrationError = response.errorMessages.join(', ');
          }
          form.resetForm();
          this.registerData = {
          userName: '',
          name: '',
          password: '',
          role: 'user'
          };
        },
        error => {
          this.registrationSuccess = '';
          this.registrationError = 'An error occurred while registering.';
        }
      );
    } 
    else {
      this.registrationError = 'Please fill out the form correctly.';
      this.registrationSuccess = '';
    }
  }
}
