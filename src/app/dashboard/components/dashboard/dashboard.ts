import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat';
import { NotesComponents } from '../notes/notes';
import { UntitledNotesComponent } from '../untitled-notes/untitled-notes';
import { AuthService } from '../../../auth/service/auth-service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    ChatComponent,
    NotesComponents,
    UntitledNotesComponent,
    NgIf,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): boolean {
    if (!this.authService.userisAuth) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
