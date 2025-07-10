import { Component } from '@angular/core';
import { NoteComponents } from '../add-component/note/note';

@Component({
  selector: 'app-notes',
  imports: [
    NoteComponents
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.scss'
})
export class NotesComponents {

}
