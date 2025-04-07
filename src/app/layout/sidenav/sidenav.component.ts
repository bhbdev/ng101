import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule,  MatListModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {}