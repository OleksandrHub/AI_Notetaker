import { Component } from '@angular/core';
import { NoteComponents } from '../note/note.component';

@Component({
  selector: 'app-notes',
  imports: [
    NoteComponents
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponents {

}
