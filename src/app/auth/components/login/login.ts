import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

type TUser = {
  login: string;
  password: string;
}


@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }

  // Змінні
  users: TUser[] = [
    {
      login: 'admin',
      password: 'admin123'
    }
  ]

  errorMessage: string = '';

  // Форма входу
  formLogin = new FormControl('', Validators.required);
  formPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  form = new FormGroup({
    formLogin: this.formLogin,
    formPassword: this.formPassword
  })

  // Функції
  sendLogin() {
    this.errorMessage = '';
    if (this.form.valid) {
      const user = this.users.find((user) => user.login === this.formLogin.value && user.password === this.formPassword.value);
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid login or password';
      }
    } else {
      if (this.formLogin.hasError('required')) {
        this.errorMessage = 'Login is required.';
      } else if (this.formPassword.hasError('required')) {
        this.errorMessage = 'Password is required.';
      } else if (this.formPassword.hasError('minlength')) {
        this.errorMessage = 'Password must be at least 6 characters long.';
      }
    }
  }
}
