import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SnackBarService } from '../../../dashboard/services/snackBar.service';

@Component({
  selector: 'app-registation',
  imports: [RouterLink, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class RegistationComponent {
  constructor(private authService: AuthService, private router: Router, private snackBarService: SnackBarService) { }

  errorMessage: string = ''

  formLogin = new FormControl('', Validators.required,)
  formPassword = new FormControl('', [Validators.required, Validators.minLength(6)])
  formRepeatPassword = new FormControl('', [Validators.required, Validators.minLength(6)])

  form = new FormGroup({
    formLogin: this.formLogin,
    formPassword: this.formPassword,
    formRepeatPassword: this.formRepeatPassword
  })

  sendRegistration() {
    this.errorMessage = ''
    if (this.form.valid) {
      if (this.formPassword.value === this.formRepeatPassword.value) {
        if (this.authService.users.find((user) => user.login === this.formLogin.value)) {
          this.errorMessage = 'User already exists'
          return
        }

        const user = {
          id: Math.max(0, ...this.authService.users.map(u => u.id)) + 1,
          login: this.formLogin.value || '',
          password: this.formPassword.value || ''
        }
        this.authService.register(user);
        this.authService.login(user);
        this.snackBarService.open('Ви успішно зареєстровані!');
        this.router.navigate(['/dashboard']); // Змінити на '/dashboard' якщо потрібно перенаправлення на головну сторінку

      } else {
        this.errorMessage = 'Passwords do not match'
      }
    } else {
      this.formIsValid();
    }
    return;
  }

  formIsValid() {
    if (this.formLogin.hasError('required')) {
      this.errorMessage = 'Login is required.';
    } else if (this.formPassword.hasError('required')) {
      this.errorMessage = 'Password is required.';
    } else if (this.formPassword.hasError('minlength')) {
      this.errorMessage = 'Password must be at least 6 characters long.';
    } else if (this.formRepeatPassword.hasError('required')) {
      this.errorMessage = 'Repeat password is required.';
    } else if (this.formRepeatPassword.hasError('minlength')) {
      this.errorMessage = 'Repeat password must be at least 6 characters long.';
    } else {
      this.errorMessage = 'Form is invalid.';
    }
    return;
  }
}
