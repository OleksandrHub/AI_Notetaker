import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpenAiService } from '../../services/onpenai.service';
import { IMessage } from '../../../../Interfaces';
import { GroqService } from '../../services/groq.service';
import { NoteService } from '../../services/note.service';
import { AuthService } from '../../../auth/service/auth.service';
import { SnackBarService } from '../../../dashboard/services/snackBar.service';

@Component({
  selector: 'app-chat',
  imports: [
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  chatInput = new FormControl('', Validators.required);
  messageError: string = '';
  themeButtonText: string = 'Dark mode';


  form = new FormGroup({
    chatInput: this.chatInput
  })
  messages: IMessage[] = [ //Потім видалити
    {
      user: 'User',
      text: 'Hello'
    },
    {
      user: 'Bot',
      text: 'Hello! How can I help you?'
    }
  ];

  nameUser: string = '';

  constructor(
    private openAiService: OpenAiService,
    private groqService: GroqService,
    private NoteService: NoteService,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {
    this.nameUser = this.authService.userisAuth?.login || '';
  }

  sendMessage() {
    this.messageError = '';
    if (this.form.valid && this.chatInput.value?.trim()) {
      this.pushMessage('User', this.chatInput.value);

      this.groqService.summarize(this.chatInput.value).subscribe(
        res => { this.pushMessage('Bot', res); },
        err => { this.pushMessage('Bot', 'Error: ' + err.message); },
        () => { this.snackBarService.open('Повідомлення успішно відправлено!'); }
      )

      this.form.reset();
    } else {
      if (this.chatInput.hasError('required') || this.chatInput.value?.trim() === '') {
        this.messageError = '*Message is required';
      } else {
        this.messageError = '*Invalid message';
      }
    }
  }

  pushMessage(user: string, text: string) {
    this.messages.push({
      user: user,
      text: text
    });
  }

  selectMessage(message: IMessage) {
    if (message.user === 'Bot') {
      this.NoteService.newNote({
        id: -1,
        title: '',
        content: message.text
      });
      this.snackBarService.open('Нотатка додана в режим редагування!');
    }
  }
}
