import { Component,  AfterViewInit, OnDestroy, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil, Subject } from 'rxjs';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, HeaderComponent, SidenavComponent, MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
    isHandset = signal(false);
    sidenav = viewChild<MatSidenav>('sidenav')
   
    private destroy$ = new Subject<void>();

    constructor(private breakpointObserver: BreakpointObserver) {}

    toggleSidenav() {
        this.sidenav()?.toggle()
    }
    ngAfterViewInit() {
        this.breakpointObserver
            .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                if (result.matches) {
                    this.sidenav()!.mode = 'over';
                    this.sidenav()?.close();
                } else {
                    this.sidenav()!.mode = 'side';
                    this.sidenav()?.open();
                }
                this.isHandset.update(value => result.matches);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

