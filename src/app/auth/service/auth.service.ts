import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../../../Interface/interface.module";
import { ThemeService } from "../../dashboard/services/theme.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'token';
    userisAuth: IUser | null = null;

    users: IUser[] = []

    constructor(private router: Router, private themeService: ThemeService) {
        this.loadUsersFromLocalStorage();

        if (localStorage.getItem('token')) {
            this.userisAuth = this.getUserFromToken();
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
        const token = this.generateToken(this.userisAuth); // Simple token generation
        localStorage.setItem('token', token);
    }

    register(user: IUser) {
        this.users.push(user);
        this.saveUsersToLocalStorage();
    }

    logoutWithAccount() {
        this.userisAuth = null;
        this.router.navigate(['/login']);
        localStorage.removeItem(this.TOKEN_KEY);
    }

    deleteAccount() {
        if (this.userisAuth) {
            this.users = this.users.filter(user => user.login !== this.userisAuth?.login);
            this.saveUsersToLocalStorage();
            this.logoutWithAccount();
        }
    }

    private generateToken(user: IUser): string {
        return btoa(JSON.stringify(user));
    }

    private getUserFromToken(): IUser | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        try {
            return token ? JSON.parse(atob(token)) : null;
        } catch (e) {
            console.error("Invalid token", e);
            return null;
        }
    }

    private saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    private loadUsersFromLocalStorage() {
        const users = localStorage.getItem('users');
        try {
            this.users = users ? JSON.parse(users) : [];
        } catch (e) {
            console.error("could not load users from local storage", e);
            this.users = [];
            this.saveUsersToLocalStorage();
        }

    }
}