import { Routes } from '@angular/router';
import { NonePageComponent } from './pages/auth/none-page/none-page.component';
import { isAuthenticatedGuard } from './pages/auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './pages/auth/guards/is-not-authenticated.guard'

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
            // Navigation child routes module ACTUAR
            {
                path: 'configuracion/cards',
                canActivate: [isAuthenticatedGuard],
                loadChildren: () => import('./pages/configuracion/configuracion-routing.module').then( m => m.ConfiguracionRoutingModule),
                // children: [
                //     {
                //         path: 'acciones-resultados',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/actuar/pages/acciones-resultados/acciones-resultados.component').then( c => c.AccionesResultadosComponent )
                //     },
                // ]
            },
            {
                path: 'configuracion/empresas',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/configuracion/pages/parametrizacion-sistema/sub-pages/empresas/empresas.component').then( c => c.EmpresasComponent),
                children: [
                    {
                        path: 'responsable',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/responsable/responsable.component').then( c => c.ResponsableComponent )
                    },
                    {
                        path: 'responsabilidades',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/responsabilidades/responsabilidades.component').then( c => c.ResponsabilidadesComponent )
                    },
                    {
                        path: 'asignacion-recursos',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/asignacion-recursos/asignacion-recursos.component').then( c => c.AsignacionRecursosComponent )
                    },
                    {
                        path: 'afiliacion-sst',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/afiliacion-sst/afiliacion-sst.component').then( c => c.AfiliacionSstComponent )
                    },
                    {
                        path: 'funcionamiento-copasst',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/funcionamiento-copasst/funcionamiento-copasst.component').then( c => c.FuncionamientoCopasstComponent )
                    },
                    {
                        path: 'capacitacion-copasst',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/capacitacion-copasst/capacitacion-copasst.component').then( c => c.CapacitacionCopasstComponent )
                    },
                    {
                        path: 'funcionamiento-ccl',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/funcionamiento-ccl/funcionamiento-ccl.component').then( c => c.FuncionamientoCclComponent )
                    },
                ]
            },
            {
                path: 'configuracion/parametrizacion-sistema',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/configuracion/pages/parametrizacion-sistema/parametrizacion-sistema.component').then( c => c.ParametrizacionSistemaComponent),
                children: [
                    {
                        path: 'empresas',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/configuracion/pages/parametrizacion-sistema/sub-pages/empresas/empresas.component').then( c => c.EmpresasComponent )
                    },
                ]
            },

            // Navigation child routes module PLANEAR
            {
                path: 'planear/cards',
                canActivate: [isAuthenticatedGuard],
                // loadChildren: () => import('./pages/planear/planear-routing.module').then( m => m.PlanearRoutingModule ),
                loadChildren: () => import('./pages/planear/planear-routing.module').then( m => m.PlanearRoutingModule),
                // children: [
                //     {
                //         path: 'recursos',
                //         canActivate: [isAuthenticatedGuard],
                //         component: RecursosComponent,
                //     },
                //     {
                //         path: 'capacitacion',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/planear/pages/capacitacion/capacitacion.component').then( c => c.CapacitacionComponent )
                //     },
                //     {
                //         path: 'gestion-integral',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/planear/pages/gestion-integral/gestion-integral.component').then( c => c.GestionIntegralComponent )
                //     },
                // ]
            },
            {
                path: 'planear/recursos',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/planear/pages/recursos/recursos.component').then( c => c.RecursosComponent),
                children: [
                    {
                        path: 'responsable',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/responsable/responsable.component').then( c => c.ResponsableComponent )
                    },
                    {
                        path: 'responsabilidades',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/responsabilidades/responsabilidades.component').then( c => c.ResponsabilidadesComponent )
                    },
                    {
                        path: 'asignacion-recursos',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/asignacion-recursos/asignacion-recursos.component').then( c => c.AsignacionRecursosComponent )
                    },
                    {
                        path: 'afiliacion-sst',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/afiliacion-sst/afiliacion-sst.component').then( c => c.AfiliacionSstComponent )
                    },
                    {
                        path: 'funcionamiento-copasst',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/funcionamiento-copasst/funcionamiento-copasst.component').then( c => c.FuncionamientoCopasstComponent )
                    },
                    {
                        path: 'capacitacion-copasst',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/capacitacion-copasst/capacitacion-copasst.component').then( c => c.CapacitacionCopasstComponent )
                    },
                    {
                        path: 'funcionamiento-ccl',
                        canActivate: [isAuthenticatedGuard],
                        loadComponent: () => import('./pages/planear/pages/recursos/sub-pages/funcionamiento-ccl/funcionamiento-ccl.component').then( c => c.FuncionamientoCclComponent )
                    },
                ]
            },
            {
                path: 'planear/capacitacion',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/planear/pages/capacitacion/capacitacion.component').then( c => c.CapacitacionComponent )
            },
            {
                path: 'planear/gestion-integral',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/planear/pages/gestion-integral/gestion-integral.component').then( c => c.GestionIntegralComponent )
            },
            

            // Navigation child routes module HACER
            {
                path: 'hacer/cards',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/hacer/pages/dashboard-hacer/dashboard-hacer.component').then( c => c.DashboardHacerComponent ),
                // children: [
                //     {
                //         path: 'dashboard/hacer/condiciones-salud',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/hacer/pages/condiciones-salud/condiciones-salud.component').then( c => c.CondicionesSaludComponent )
                //     },
                //     {
                //         path: 'gestion-amenazas',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/hacer/pages/gestion-amenazas/gestion-amenazas.component').then( c => c.GestionAmenazasComponent )
                //     },
                //     {
                //         path: 'registro-atel',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/hacer/pages/investigaciones-atel/investigaciones-atel.component').then( c => c.InvestigacionesAtelComponent )
                //     },
                //     {
                //         path: 'identificacion-riesgo',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/hacer/pages/identificacion-peligro/identificacion-peligro.component').then( c => c.IdentificacionPeligroComponent )
                //     },
                // ]
            },
            {
                path: 'hacer/condiciones-salud',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/hacer/pages/condiciones-salud/condiciones-salud.component').then( c => c.CondicionesSaludComponent )
            },
            {
                path: 'hacer/gestion-amenazas',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/hacer/pages/gestion-amenazas/gestion-amenazas.component').then( c => c.GestionAmenazasComponent )
            },
            {
                path: 'hacer/registro-atel',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/hacer/pages/investigaciones-atel/investigaciones-atel.component').then( c => c.InvestigacionesAtelComponent )
            },
            {
                path: 'hacer/identificacion-riesgo',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/hacer/pages/identificacion-peligro/identificacion-peligro.component').then( c => c.IdentificacionPeligroComponent )
            },
            

            // Navigation child routes module VERIFICAR
            {
                path: 'verificar/cards',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/verificar/pages/dashboard-verificar/dashboard-verificar.component').then( c => c.DashboardVerificarComponent ),
                // children: [
                //     {
                //         path: 'gestion-resultados',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/verificar/pages/gestion-resultados/gestion-resultados.component').then( c => c.GestionResultadosComponent )
                //     },
                // ]
            },
            {
                path: 'verificar/gestion-resultados',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/verificar/pages/gestion-resultados/gestion-resultados.component').then( c => c.GestionResultadosComponent )
            },


            // Navigation child routes module ACTUAR
            {
                path: 'actuar/cards',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/actuar/pages/dashboard-actuar/dashboard-actuar.component').then( c => c.DashboardActuarComponent ),
                // children: [
                //     {
                //         path: 'acciones-resultados',
                //         canActivate: [isAuthenticatedGuard],
                //         loadComponent: () => import('./pages/actuar/pages/acciones-resultados/acciones-resultados.component').then( c => c.AccionesResultadosComponent )
                //     },
                // ]
            },
            {
                path: 'actuar/acciones-resultados',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./pages/actuar/pages/acciones-resultados/acciones-resultados.component').then( c => c.AccionesResultadosComponent )
            },
            
        ]
    },
    // {
    //     path: '',
    //     redirectTo: '/sign-in',
    //     pathMatch: 'full',
    // },
    {   
        path: '**', 
        loadComponent: () => import('./pages/auth/none-page/none-page.component').then(c => c.NonePageComponent )  
    },
];
