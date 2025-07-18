import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { NotesComponents } from '../notes-component/notes/notes.component';
import { UntitledNotesComponent } from '../untitled-notes/untitled-notes.component';
import { AuthService } from '../../../auth/service/auth.service';
import { ThemeService } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../../dashboard/services/snackBar.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    ChatComponent,
    NotesComponents,
    UntitledNotesComponent,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  themeButtonText: string = 'Dark mode';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private snackBarService: SnackBarService,
  ) { }

  logoutWithAccount() {
    this.authService.logoutWithAccount();
    this.snackBarService.open('Ви успішно вийшли з акаунту!');
  }

  deleteAccount() {
    this.authService.deleteAccount();
    this.snackBarService.open('Ви успішно видалили акаунт!');
  }

  changeTheme() {
    this.themeButtonText = this.themeService.changeTheme();
    this.snackBarService.open(`Тема змінена на ${this.themeButtonText}`);
  }
}
