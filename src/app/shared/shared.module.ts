import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SplashComponent } from './components/splash/splash.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [NavBarComponent, LayoutComponent, SplashComponent],
    imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
    exports: [RouterModule, MatProgressSpinnerModule, LayoutComponent, SplashComponent, NavBarComponent],
})
export class SharedModule {}
