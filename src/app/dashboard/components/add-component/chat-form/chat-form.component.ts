import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat-form.component.html',
  styleUrl: './chat-form.component.scss'
})
export class ChatFormComponent {
  @Output() messageSent = new EventEmitter<string>();

  chatInput = new FormControl('', Validators.required);
  form = new FormGroup({
    chatInput: this.chatInput
  })

  sendMessage() {
    if (this.form.valid && this.chatInput.value) {
      this.messageSent.emit(this.chatInput.value);
      this.form.reset();
    }
  }
}
