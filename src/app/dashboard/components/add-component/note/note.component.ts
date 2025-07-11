import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { INote } from '../../../../../Interface/interface.module';

@Component({
  selector: 'app-note',
  imports: [
    NgFor,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponents {

  @Input() notes: INote[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.notes = this.noteService.notes;
  }
}
