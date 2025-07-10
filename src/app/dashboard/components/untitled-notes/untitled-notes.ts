import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INote } from '../../../../Interface/interface';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-untitled-notes',
  imports: [NgIf],
  templateUrl: './untitled-notes.html',
  styleUrl: './untitled-notes.scss'
})
export class UntitledNotesComponent {
  constructor(private noteService: NoteService) { }

  @Input() note: INote = {
    id: 0,
    title: '',
    content: ''
  };
}
