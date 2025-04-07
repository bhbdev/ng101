import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIconStack, NgIcon, provideIcons } from '@ng-icons/core';
import { matFiberManualRecordSharp, matSettingsSharp } from '@ng-icons/material-icons/sharp';

import {  MoveDirection, OutMode, Container,Engine} from "@tsparticles/engine";
import { NgxParticlesModule, NgParticlesService } from "@tsparticles/angular";
import { confetti } from "@tsparticles/confetti";
import { loadSlim } from "@tsparticles/slim";

const ROWS = 10;
const COLS = 10;
const MINES = 5;

const DIRS = [
    [-1, -1],   // top left
    [-1, 0],    // top
    [-1, 1],    // top right
    [0, -1],    // left
    [0, 1],     // right
    [1, -1],    // bottom left
    [1, 0],     // bottom
    [1, 1]      // bottom right
];

interface MineCoordinates {
    row: number;
    col: number;
}

interface Cell {
    mines: number;
    isMine: boolean;
    revealed: boolean;
    flagged: boolean;
}

@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule, MatIconModule, NgIconStack, NgIcon, NgxParticlesModule ],
  providers: [
    provideIcons({
        matSettingsSharp,
        matFiberManualRecordSharp,
    })
  ],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss'
})
export class MinesweeperComponent implements OnInit {

    // confetti settings
    confettiId = "confetti";
    confettiOptions = {};

    board: Cell[][] = [];
    mines: MineCoordinates[] = [];
    gameOver: boolean = false;
    win: boolean = false;
    flags: number = 0;
   // flagged: number = 0;
    revealed: number = 0;

    constructor(private readonly ngParticlesService: NgParticlesService) {
        this.init();
    }

    ngOnInit() {
       void this.ngParticlesService.init(async (engine:Engine) => {
            await loadSlim(engine);
        });
    }


    init() {

        this.board = Array(ROWS).fill([]).map(() => 
            Array(COLS).fill(0).map(() => ({
            mines: 0,
            isMine: false,
            revealed: false,
            flagged: false
            } as Cell))
        );

        this.gameOver = false;
        this.win = false;
        this.flags = 0;
       // this.flagged = 0;
        this.revealed = 0;
        this.mines.length = 0;
        this.placeMines();
        // Remove any added classes from the last game
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('!bg-red-500'));
        
    }



    placeMines() {
        let i = 0;
        while (i < MINES) {
            const row = Math.floor(Math.random() * ROWS);
            const col = Math.floor(Math.random() * COLS);
            if (this.board[row][col].isMine === false) {
                this.board[row][col].isMine = true;
                this.mines.push({row, col});
                i++;
            }
        }

        this.mines.forEach(mine => {
            DIRS.forEach(dir => {
                const newRow = mine.row + dir[0];
                const newCol = mine.col + dir[1];
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && this.board[newRow][newCol].mines !== -1) {
                    this.board[newRow][newCol].mines++;
                }
            });
        });
    }

    reveal(event: any|null, row: number, col: number) {
        //console.log(row, col);
        if (this.gameOver || this.win) {
            return;
        }

        if (this.board[row][col].flagged || this.board[row][col].revealed) {
            return;
        }

        if (this.board[row][col].isMine) {
            event?.target.classList.add('!bg-red-500');
            // reveal all mines
            this.mines.forEach(mine => {
                this.board[mine.row][mine.col].revealed = true;
            });

            this.gameOver = true;
            return;
        }

        this.board[row][col].revealed = true;
        this.revealed++;

        if (this.board[row][col].mines === 0) {
            DIRS.forEach(dir => {
                const newRow = row + dir[0];
                const newCol = col + dir[1];
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                    this.reveal(null, newRow, newCol);
                }
            });
        }
        if (this.revealed === ROWS * COLS - MINES) {
            this.win = true;
            this.gameOver = true;
            this.mines.forEach(mine => {
                this.board[mine.row][mine.col].revealed = true;
            });
    
            this.celebrate(event);
        }
    }

    flag(event:any, row: number, col: number) {
        event.preventDefault();
        if (this.gameOver || this.win) {
            return;
        }

        if (this.board[row][col].revealed) {
            return;
        }
        if (this.flags === MINES && !this.board[row][col].flagged) {
            // show alert if the user tries to flag a cell when they have
            // already flagged all mines
            alert('You have already flagged all possible mines');
            return;
        }

        this.board[row][col].flagged = !this.board[row][col].flagged;
        if (this.board[row][col].flagged) {
            this.flags++;
        } else {
            this.flags--;
        }

        if (this.checkWin()) {
            this.celebrate(event);
        }
    }

    checkWin() : boolean {
        if (this.flags === MINES) {
            this.win = this.mines.every(mine => this.board[mine.row][mine.col].flagged);
            if (this.win) {
                this.gameOver = true;
                return true;
            }
        }
        return false;
    }

    celebrate(event?: MouseEvent) {
        if (!event) return;
        const canvas = document.querySelector(`#${this.confettiId} canvas`) as HTMLCanvasElement;
        if (canvas) {

            const rect = canvas.getBoundingClientRect(); 
            this.confettiOptions = {
                angle: 90,
                spread: 75,
                startVelocity: 45,
                origin: {
                    x: (event.clientX - rect.left) / rect.width,
                    y: (event.clientY - rect.top) / rect.height,
                },
            };
        }
        confetti( 
            this.confettiId,
            this.confettiOptions
        );
    }

}
