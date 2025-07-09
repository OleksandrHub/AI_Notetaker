import { Component } from '@angular/core';
import { NoteComponents } from '../note/note';

@Component({
  selector: 'app-notes',
  imports: [NoteComponents],
  templateUrl: './notes.html',
  styleUrl: './notes.scss'
})
export class NotesComponents {

}
