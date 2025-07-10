import { Injectable } from "@angular/core";

type TUser = {
    id: number;
    login: string;
    password: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    userisAuth: TUser | null = null;

    users: TUser[] = [
        {
            id: 1,
            login: 'admin',
            password: 'admin123'
        }
    ]


    login(user: TUser) {
        this.userisAuth = { ...user };
    }

    register(user: TUser) {
        this.users.push(user);
    }
}