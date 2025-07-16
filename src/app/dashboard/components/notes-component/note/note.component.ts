import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { INote } from '../../../../../Interface/Interface';

@Component({
  selector: 'app-note',
  imports: [
    NgFor,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponents {

  notes: INote[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.notes$.subscribe((notes) => {
      this.notes = notes;
    });
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }

  editNote(id: number) {
    this.noteService.editNote(id);
  }
}
