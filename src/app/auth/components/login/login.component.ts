import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SnackBarService } from '../../../dashboard/services/snackBar.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, private snackBarService: SnackBarService) { }

  errorMessage: string = '';

  formLogin = new FormControl('', Validators.required);
  formPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  form = new FormGroup({
    formLogin: this.formLogin,
    formPassword: this.formPassword
  })

  sendLogin() {
    this.errorMessage = '';
    if (this.form.valid) {
      const user = this.authService.users.find((user) => user.login === this.formLogin.value && user.password === this.formPassword.value);
      if (user) {
        this.authService.login(user);
        this.snackBarService.open('Ви успішно увійшли!');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid login or password';
      }
    } else {
      this.formIsValid();
    }
  }

  formIsValid() {
    if (this.formLogin.hasError('required')) {
      this.errorMessage = 'Login is required.';
    } else if (this.formPassword.hasError('required')) {
      this.errorMessage = 'Password is required.';
    } else if (this.formPassword.hasError('minlength')) {
      this.errorMessage = 'Password must be at least 6 characters long.';
    } else {
      this.errorMessage = 'Form is invalid. Please check your input.';
    }
  }
}
