import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { NotesComponents } from '../notes-component/notes/notes.component';
import { UntitledNotesComponent } from '../untitled-notes/untitled-notes.component';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { AuthService } from '../../../auth/service/auth.service';
import { ThemeService } from '../../services/theme.service';



@Component({
  selector: 'app-dashboard',
  imports: [
    ChatComponent,
    NotesComponents,
    UntitledNotesComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  themeButtonText: string = 'Dark mode';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) { }

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
