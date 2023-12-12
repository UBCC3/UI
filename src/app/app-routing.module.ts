import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'new-calculation',
        loadChildren: () =>
            import('./features/new-calculation/new-calculation.module').then((m) => m.NewCalculationModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'edit-structure',
        loadChildren: () =>
            import('./features/edit-structure/edit-structure.module').then((m) => m.EditStructureModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then((m) => m.SettingsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'callback',
        loadChildren: () => import('./features/callback/callback.module').then((m) => m.CallbackModule),
    },
    {
        path: '**',
        loadChildren: () => import('./features/not-found/not-found.module').then((m) => m.NotFoundModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
