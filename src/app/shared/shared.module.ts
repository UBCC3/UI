import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SplashComponent } from './components/splash/splash.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';

@NgModule({
    declarations: [NavBarComponent, LayoutComponent, SplashComponent, StatusIconComponent],
    imports: [CommonModule, RouterModule],
    exports: [RouterModule, LayoutComponent, SplashComponent, NavBarComponent, StatusIconComponent],
})
export class SharedModule {}
