import { Component } from '@angular/core';
import { NoteComponents } from '../note/note.component';
import { INote } from '../../../../../Interfaces';
import { NoteService } from '../../../services/note.service';
import { NgFor, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  imports: [
    NoteComponents,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponents {
  notes$: Observable<INote[]>;

  constructor(private noteService: NoteService) {
    this.notes$ = this.noteService.notes$;
  }
}
