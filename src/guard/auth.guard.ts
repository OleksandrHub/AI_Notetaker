import { Injectable } from "@angular/core";
import { AuthService } from "../app/auth/service/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.userisAuth) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}