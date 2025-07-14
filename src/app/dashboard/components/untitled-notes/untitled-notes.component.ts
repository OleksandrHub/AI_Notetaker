import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INote } from '../../../../Interface/interface.module';
import { NoteService } from '../../services/note.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-untitled-notes',
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './untitled-notes.component.html',
  styleUrl: './untitled-notes.component.scss'
})
export class UntitledNotesComponent {
  constructor(private noteService: NoteService) { }
  note: INote = {
    id: 0,
    title: '',
    content: ''
  };

  formTitle = new FormControl('', Validators.required); // Ініціалізуємо порожнім значенням
  formContent = new FormControl('', Validators.required); // Ініціалізуємо порожнім значенням
  messageError: string = '';

  form = new FormGroup({
    formTitle: this.formTitle,
    formContent: this.formContent
  });

  ngOnInit() {
    this.noteService.editNote$.subscribe((note) => {
      this.note = note;
      this.form.patchValue({
        formTitle: note.title,
        formContent: note.content
      });
    });
  }

  saveNote() {
    this.messageError = '';

    if (this.form.valid) {
      this.noteService.saveNote({
        id: this.note.id,
        title: this.formTitle.value || '',
        content: this.formContent.value || ''
      });
      this.closeNote();
    } else {
      this.messageError = 'All fields are required';
    }
  }

  closeNote() {
    this.noteService.editNoteObj.next({
      id: 0,
      title: '',
      content: ''
    });
    // Скидаємо форму, щоб очистити поля вводу
    this.form.reset();
  }
}
