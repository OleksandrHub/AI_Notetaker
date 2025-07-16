import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ThemeService {
    loadTheme() {
        const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
        document.body.classList.toggle('dark-theme', isDarkTheme);
    }

    changeTheme() {
        const currentTheme = localStorage.getItem('isDarkTheme') === 'true';
        const isDarkTheme = !currentTheme;
        document.body.classList.toggle('dark-theme', isDarkTheme);
        localStorage.setItem('isDarkTheme', isDarkTheme.toString());
        return isDarkTheme ? 'Light mode' : 'Dark mode';
    }
}