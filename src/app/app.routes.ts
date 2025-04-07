import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CharacterCreatorComponent } from './pages/character-creator/character-creator.component';   

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'creator', component: CharacterCreatorComponent },
    { path: 'minesweeper', loadComponent: () => import('./pages/minesweeper/minesweeper.component').then((c) => c.MinesweeperComponent) },
];
