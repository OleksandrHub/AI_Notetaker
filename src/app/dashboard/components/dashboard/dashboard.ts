import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat';
import { NotesComponents } from '../notes/notes';
import { UntitledNotesComponent } from '../untitled-notes/untitled-notes';

@Component({
  selector: 'app-dashboard',
  imports: [ChatComponent, NotesComponents, UntitledNotesComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

}
