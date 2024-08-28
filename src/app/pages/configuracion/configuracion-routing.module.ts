import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardConfiguracionComponent } from "./pages/dashboard-configuracion/dashboard-configuracion.component";
import { EmpresasComponent } from "./pages/parametrizacion-sistema/sub-pages/empresas/empresas.component";


import { isAuthenticatedGuard } from "../auth/guards/is-authenticated.guard";

const routes: Routes = [
    {   path: '', 
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./pages/dashboard-configuracion/dashboard-configuracion.component').then( c => c.DashboardConfiguracionComponent ), 
        children: [
            {   path: 'empresas',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/parametrizacion-sistema/sub-pages/empresas/empresas.component').then( c => c.EmpresasComponent ) 
            },   
        ]
    }, 
    {   path: 'configuracion', 
        canActivate: [isAuthenticatedGuard],
        component: DashboardConfiguracionComponent,  
        children: [
            {   path: 'empresas',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/parametrizacion-sistema/sub-pages/empresas/empresas.component').then( c => c.EmpresasComponent ) 
            },
            {   path: 'parametrizacion-sistema',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/parametrizacion-sistema/parametrizacion-sistema.component').then( c => c.ParametrizacionSistemaComponent ) 
            },
        ]
    }, 
    {   path: 'dashboard/configuracion', 
        canActivate: [isAuthenticatedGuard],
        component: DashboardConfiguracionComponent,  
        children: [
            {   path: 'empresas',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/parametrizacion-sistema/sub-pages/empresas/empresas.component').then( c => c.EmpresasComponent ) 
            },

            {   path: 'parametrizacion-sistema',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/parametrizacion-sistema/parametrizacion-sistema.component').then( c => c.ParametrizacionSistemaComponent ) 
            },
        ]
    },
    
];
  
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [
    RouterModule,
]
})
export class ConfiguracionRoutingModule { }