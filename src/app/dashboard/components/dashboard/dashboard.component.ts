import { Component } from '@angular/core';
import { ChatComponent } from '../chat-component/chat/chat.component';
import { NotesComponents } from '../notes-component/notes/notes.component';
import { UntitledNotesComponent } from '../untitled-notes/untitled-notes.component';
import { AuthService } from '../../../auth/service/auth.service';
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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) { }
  Initalize(): boolean {
    if (!this.authService.userisAuth) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
