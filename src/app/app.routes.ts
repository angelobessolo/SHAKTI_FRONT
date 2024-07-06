import { Routes } from '@angular/router';
import { NonePageComponent } from './pages/auth/none-page/none-page.component';
import { isAuthenticatedGuard } from './pages/auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './pages/auth/guards/is-not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'sign-in',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then( c => c.SignInComponent )
    },
    {
        path: 'dashboard',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./pages/dashboard/pages/dashboard-main/dashboard-main.component').then( c => c.DashboardMainComponent ),
        children: [
            {
                path: 'planear',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/planear/pages/dashboard-planear/dashboard-planear.component').then( c => c.DashboardPlanearComponent )
            },
            {
                path: 'hacer',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/hacer/pages/dashboard-hacer/dashboard-hacer.component').then( c => c.DashboardHacerComponent )
            },
            {
                path: 'verificar',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/verificar/pages/dashboard-verificar/dashboard-verificar.component').then( c => c.DashboardVerificarComponent )
            },
            {
                path: 'actuar',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/actuar/pages/dashboard-actuar/dashboard-actuar.component').then( c => c.DashboardActuarComponent )
            },
        ]
    },
    {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full',
    },
    {   path: '**', 
        component: NonePageComponent },
];
