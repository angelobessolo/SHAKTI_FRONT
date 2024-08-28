import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecursosComponent } from "./pages/recursos/recursos.component";
import { DashboardPlanearComponent } from "./pages/dashboard-planear/dashboard-planear.component";
import { CapacitacionComponent } from "./pages/capacitacion/capacitacion.component";
import { GestionIntegralComponent } from "./pages/gestion-integral/gestion-integral.component";
import { isAuthenticatedGuard } from "../auth/guards/is-authenticated.guard";

const routes: Routes = [
    {   path: '', 
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./pages/dashboard-planear/dashboard-planear.component').then( c => c.DashboardPlanearComponent ), 
        children: [
            // {   path: '', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadComponent: () => import('./pages/dashboard-planear/dashboard-planear.component').then( c => c.DashboardPlanearComponent ) 
            // }, 
            // {   path: 'planear', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadChildren: () => import('../planear/pages').then( c => c.DashboardPlanearComponent ) 
            // }, 
            {   path: 'recursos',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/recursos/recursos.component').then( c => c.RecursosComponent ) 
            },   
            {   path: 'capacitacion', 
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/capacitacion/capacitacion.component').then( c => c.CapacitacionComponent )   
            },
            {   path: 'gestion-integral', 
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/gestion-integral/gestion-integral.component').then( c => c.GestionIntegralComponent ) 
            },
        ]
    }, 
    {   path: 'planear', 
        canActivate: [isAuthenticatedGuard],
        component: DashboardPlanearComponent,  
        children: [
            // {   path: '', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadComponent: () => import('./pages/dashboard-planear/dashboard-planear.component').then( c => c.DashboardPlanearComponent ) 
            // }, 
            // {   path: 'planear', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadChildren: () => import('../planear/pages').then( c => c.DashboardPlanearComponent ) 
            // }, 
            {   path: 'recursos',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/recursos/recursos.component').then( c => c.RecursosComponent ) 
            },
            
            // {   path: 'capacitacion', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadComponent: () => import('./pages/capacitacion/capacitacion.component').then( c => c.CapacitacionComponent )   
            // },
            // {   path: 'gestion-integral', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadComponent: () => import('./pages/gestion-integral/gestion-integral.component').then( c => c.GestionIntegralComponent ) 
            // },
        ]
    }, 
    {   path: 'dashboard/planear', 
        canActivate: [isAuthenticatedGuard],
        component: DashboardPlanearComponent,  
        children: [
            // {   path: '', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadComponent: () => import('./pages/dashboard-planear/dashboard-planear.component').then( c => c.DashboardPlanearComponent ) 
            // }, 
            // {   path: 'planear', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadChildren: () => import('../planear/pages').then( c => c.DashboardPlanearComponent ) 
            // }, 
            {   path: 'recursos',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/recursos/recursos.component').then( c => c.RecursosComponent ) 
            },
            
            // {   path: 'capacitacion', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadComponent: () => import('./pages/capacitacion/capacitacion.component').then( c => c.CapacitacionComponent )   
            // },
            // {   path: 'gestion-integral', 
            //     canActivate: [isAuthenticatedGuard],
            //     loadComponent: () => import('./pages/gestion-integral/gestion-integral.component').then( c => c.GestionIntegralComponent ) 
            // },
        ]
    },
    
];
  
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [
    RouterModule,
]
})
export class PlanearRoutingModule { }