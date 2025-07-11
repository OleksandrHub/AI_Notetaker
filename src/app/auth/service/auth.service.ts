import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../../../Interface/interface.module";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) { }

    userisAuth: IUser | null = null;

    users: IUser[] = [
        {
            id: 1,
            login: 'admin',
            password: 'admin123'
        }
    ]

    login(user: IUser) {
        this.userisAuth = { ...user };
    }

    logout() {
        this.userisAuth = null;
        this.router.navigate(['/login']);
    }

    register(user: IUser) {
        this.users.push(user);
    }
}