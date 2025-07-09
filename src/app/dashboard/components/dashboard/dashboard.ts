import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat';
import { NotesComponents } from '../notes/notes';
import { UnutitledNotesComponent } from '../unutitled-notes/unutitled-notes';

@Component({
  selector: 'app-dashboard',
  imports: [ChatComponent, NotesComponents, UnutitledNotesComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

}
