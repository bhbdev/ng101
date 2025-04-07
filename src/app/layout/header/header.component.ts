import { Component, EventEmitter, Output } from '@angular/core';
import {MatTooltipModule } from '@angular/material/tooltip'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [ MatTooltipModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  isDarkTheme: boolean;
  
  constructor(public themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  toggleTheme() {
    this.themeService.setCurrentTheme(this.isDarkTheme);
    this.isDarkTheme = this.themeService.isDarkTheme();
  }
}
