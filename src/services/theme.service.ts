import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'user-theme';

    constructor() {
        this.loadTheme();
        console.log('ThemeService loaded');
    }

    isDarkTheme() {
        const theme = localStorage.getItem(this.THEME_KEY);
        return (theme === 'dark' || !theme);
    }


    setCurrentTheme(isDarkTheme: boolean) {
        if (isDarkTheme) {
            document.body.classList.remove('dark-theme'); // Remove darkMode
            localStorage.setItem(this.THEME_KEY, 'light');
        } else {
            document.body.classList.add('dark-theme'); // Add darkMode
            localStorage.setItem(this.THEME_KEY, 'dark');
        }
    }

    private loadTheme() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        
        if (savedTheme && savedTheme === 'light') {
            document.body.classList.remove('dark-theme');
        } else {
            console.log('dark theme:', savedTheme);
            document.body.classList.add('dark-theme');
        }
    }
}