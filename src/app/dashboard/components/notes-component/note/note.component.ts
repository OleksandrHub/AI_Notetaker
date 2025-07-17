import { Component, Input } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { INote } from '../../../../../Interfaces';

@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponents {
  @Input() note!: INote;

  constructor(private noteService: NoteService) { }
  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }

  editNote(id: number) {
    this.noteService.editNote(id);
  }
}
