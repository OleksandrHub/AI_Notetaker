import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { INote, IUser } from "../../../Interface/Interface";
import { ThemeService } from "../../dashboard/services/theme.service";
import { NoteService } from "../../dashboard/services/note.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'token';
    private readonly THEME_STORAGE_KEY = 'darkThemeUserIds';
    userisAuth: IUser | null = null;

    users: IUser[] = []

    constructor(private router: Router, private themeService: ThemeService, private noteService: NoteService) {
        this.loadUsersFromLocalStorage();

        if (localStorage.getItem('token')) {
            this.userisAuth = this.users.find(user => user.id === +localStorage.getItem('token')!) || null;
            this.router.navigate(['/dashboard']);
            this.themeService.loadTheme();
        }
        if (this.users.length === 0) { // Потім видалити
            this.users.push({
                id: 1,
                login: 'admin',
                password: 'admin123'
            });
        }
    }

    login(user: IUser) {
        this.userisAuth = { ...user };
        localStorage.setItem('token', user.id.toString());
        this.themeService.loadTheme();
        this.noteService.loadNotesFromLocalStorage();
    }

    register(user: IUser) {
        this.users.push(user);
        this.saveUsersToLocalStorage();
        this.themeService.loadTheme();
    }

    logoutWithAccount() {
        this.userisAuth = null;
        this.router.navigate(['/login']);
        localStorage.removeItem(this.TOKEN_KEY);
        this.themeService.loadTheme();
    }

    deleteAccount() {
        if (this.userisAuth) {
            const notes = JSON.parse(localStorage.getItem('notes') || '[]');
            const darkThemeUserIds = JSON.parse(localStorage.getItem(this.THEME_STORAGE_KEY) || '[]') as number[];
            const userId = this.userisAuth.id;
            for (let key in notes) {
                if (key === userId.toString()) {
                    delete notes[key];
                }
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            if (darkThemeUserIds.includes(userId)) {
                darkThemeUserIds.splice(darkThemeUserIds.indexOf(userId), 1);
                localStorage.setItem(this.THEME_STORAGE_KEY, JSON.stringify(darkThemeUserIds));
            }

            this.users = this.users.filter(user => user.login !== this.userisAuth?.login);
            this.saveUsersToLocalStorage();
            this.logoutWithAccount();
        }
    }

    private saveUsersToLocalStorage() {
        localStorage.setItem('users', btoa(JSON.stringify(this.users)));
    }

    private loadUsersFromLocalStorage() {
        const users = localStorage.getItem('users');
        try {
            this.users = users ? JSON.parse(atob(users)) : [];
        } catch (e) {
            console.error("could not load users from local storage", e);
            this.users = [];
            this.saveUsersToLocalStorage();
        }
    }
}