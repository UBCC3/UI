import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SplashComponent } from './components/splash/splash.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { StatusMenuComponent } from './components/status-menu/status-menu.component';
import { EditStructureComponent } from './components/edit-structure/edit-structure.component';
import { FormsModule } from '@angular/forms';
import { EditStructureHeaderComponent } from './components/edit-structure-header/edit-structure-header.component';

import { FocusRemoverDirective } from './directives/focus-remover.directive';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
    declarations: [
        NavBarComponent,
        LayoutComponent,
        SplashComponent,
        StatusIconComponent,
        StatusMenuComponent,
        EditStructureComponent,
        EditStructureHeaderComponent,
        FocusRemoverDirective,
        ToastComponent,
    ],
    imports: [CommonModule, RouterModule, FormsModule],
    exports: [
        RouterModule,
        LayoutComponent,
        SplashComponent,
        NavBarComponent,
        StatusIconComponent,
        StatusMenuComponent,
        EditStructureComponent,
        EditStructureHeaderComponent,
        FocusRemoverDirective,
        ToastComponent,
    ],
})
export class SharedModule {}
