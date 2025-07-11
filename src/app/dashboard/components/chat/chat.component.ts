import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpenAiService } from '../../services/onpenai.service';
import { IMessage } from '../../../../Interface/interface.module';
import { GroqService } from '../../services/groq.service';

@Component({
  selector: 'app-chat',
  imports: [
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private openAiService: OpenAiService, private groqService: GroqService) {

  }

  chatInput = new FormControl('', Validators.required);
  massageError: string = '';

  form = new FormGroup({
    chatInput: this.chatInput
  })
  messages: IMessage[] = [];

  sendMessage() {
    this.massageError = '';
    if (this.form.valid && this.chatInput.value?.trim()) {
      this.messages.push({
        user: 'User',
        text: this.chatInput.value
      });

      this.groqService.summarize(this.chatInput.value).subscribe({
        next: res => {
          this.messages.push({
            user: 'Bot',
            text: res
          })
        },
        error: err => {
          this.messages.push({
            user: 'Bot',
            text: 'Error: ' + err.message
          })
        }
      })

      this.form.reset();
    } else {
      if (this.chatInput.hasError('required') || this.chatInput.value?.trim() === '') {
        this.massageError = '*Message is required';
      }
    }
  }
}
