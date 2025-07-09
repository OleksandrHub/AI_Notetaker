import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard';
import { LoginComponent } from './auth/components/login/login';
import { RegistationComponent } from './auth/components/registration/registration';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent, LoginComponent, RegistationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'notetreak';
}
