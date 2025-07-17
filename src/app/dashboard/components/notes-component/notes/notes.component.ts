import { Component } from '@angular/core';
import { NoteComponents } from '../note/note.component';
import { INote } from '../../../../../Interfaces';
import { NoteService } from '../../../services/note.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-notes',
  imports: [
    NoteComponents,
    NgFor
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponents {
  notes: INote[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.notes$.subscribe((notes) => {
      this.notes = notes;
    });
  }
}
