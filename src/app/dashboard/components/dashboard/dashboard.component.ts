import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { NotesComponents } from '../notes-component/notes/notes.component';
import { UntitledNotesComponent } from '../untitled-notes/untitled-notes.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ChatComponent,
    NotesComponents,
    UntitledNotesComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { }
