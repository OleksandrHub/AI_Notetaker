import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../../../Interface/interface.module";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userisAuth: IUser | null = null;

    users: IUser[] = []

    constructor(private router: Router) {
        this.loadUsersFromLocalStorage();
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
    }

    register(user: IUser) {
        this.users.push(user);
        this.saveUsersToLocalStorage();
    }

    logout() {
        this.userisAuth = null;
        this.router.navigate(['/login']);
    }

    deleteAccount() {
        if (this.userisAuth) {
            this.users = this.users.filter(user => user.login !== this.userisAuth?.login);
            this.saveUsersToLocalStorage();
            this.logout();
        }
    }

    private saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    private loadUsersFromLocalStorage() {
        const users = localStorage.getItem('users');
        if (users) {
            this.users = JSON.parse(users);
        } else {
            this.saveUsersToLocalStorage();
        }
    }
}