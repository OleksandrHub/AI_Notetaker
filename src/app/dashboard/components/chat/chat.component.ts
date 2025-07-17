import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpenAiService } from '../../services/onpenai.service';
import { IMessage } from '../../../../Interface/Interface';
import { GroqService } from '../../services/groq.service';
import { NoteService } from '../../services/note.service';
import { AuthService } from '../../../auth/service/auth.service';
import { ThemeService } from '../../services/theme.service';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-chat',
  imports: [
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleGroup,
    MatButtonToggle
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
  messages: IMessage[] = [ // Потім видалити
    {
      user: 'User',
      text: 'Hello'
    },
    {
      user: 'Bot',
      text: 'Hello! How can I help you?'
    }
  ];

  constructor(
    private openAiService: OpenAiService,
    private groqService: GroqService,
    private NoteService: NoteService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {

  }

  sendMessage() {
    this.messageError = '';
    if (this.form.valid && this.chatInput.value?.trim()) {
      this.pushMessage('User', this.chatInput.value);

      this.groqService.summarize(this.chatInput.value).subscribe({
        next: res => { this.pushMessage('Bot', res); },
        error: err => { this.pushMessage('Bot', 'Error: ' + err.message); }
      })

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
    }
  }

  logoutWithAccount() {
    this.authService.logoutWithAccount();
  }

  deleteAccount() {
    this.authService.deleteAccount();
  }

  changeTheme() {
    this.themeButtonText = this.themeService.changeTheme();
  }
}
