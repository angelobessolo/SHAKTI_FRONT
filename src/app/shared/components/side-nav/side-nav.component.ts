import { Component, Input, OnInit, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Items, NavMenu, SubmoduleResponse, UserParams } from '../../interfaces/nav-menu-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatButtonComponent } from '../float-button/float-button.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NotificationsComponent } from '../notifications/notifications.component';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from '../../../services/auth/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    FloatButtonComponent,
    NotificationsComponent,
    MatDividerModule,
    MatButtonModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatSidenavModule, 
    MatTreeModule, 
    MatIconModule, 
    MatToolbarModule,
    NgxSpinnerModule, 
    MatMenuModule,
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})

export class SideNavComponent implements OnInit {
  private authService = inject(AuthService);
  private spinner     = inject(NgxSpinnerService);
  private router      = inject(Router);

  @Input() navMenu1: UserParams[] = [];
  public opened: boolean = false;

  public navMenu: NavMenu = {
    label: 'Modulos',
    menu: [
      {
        name: 'Planear',
        icon: 'book',
        children: [
          {
            name: 'Recursos',
            icon: '',
            children: [
            ],
            url: '/dashboard-planear',
          },
          {
            name: 'Capacitación',
            icon: '',
            children: [
            ],
            url: '',
          },
          {
            name: 'Gestion Integral',
            icon: '',
            children: [
            ],
            url: '',
          },
        ],
        url: 'planear',
      },
    
      {
        name: 'Hacer',
        icon: 'settings',
        children: [
          {
            name: 'Condiciones de salud',
            icon: '',
            children: [
            ],
            url: 'hacer',
          },
          {
            name: 'Registro, reporte e investigaciones ATEL',
            icon: '',
            children: [
            ],
            url: '',
          },
          {
            name: 'Identificación del peligro y valoración del riesgo',
            icon: '',
            children: [
            ],
            url: '',
          },
          {
            name: 'Gestión de amenazas',
            icon: '',
            children: [
            ],
            url: '',
          }
        ],
        url: 'hacer',
      },
    
      {
        name: 'Verificar',
        icon: 'bar_chart',
        children: [
          {
            name: 'Gestión y resultados ',
            icon: '',
            children: [
            ],
            url: '',
          },
        ],
        url: 'verificar',
      },
    
      {
        name: 'Actuar',
        icon: 'track_changes',
        children: [
          {
            name: 'Acciones P&P según resultados',
            icon: '',
            children: [
            ],
            url: '',
          }, 
        ],
        url: 'actuar',
      },
      {
        name: 'Actuar',
        icon: 'track_changes',
        children: [
          {
            name: 'Acciones P&P según resultados',
            icon: '',
            children: [
            ],
            url: '',
          }, 
        ],
        url: 'actuar',
      },
      {
        name: 'Actuar',
        icon: 'track_changes',
        children: [
          {
            name: 'Acciones P&P según resultados',
            icon: '',
            children: [
            ],
            url: '',
          }, 
        ],
        url: 'actuar',
      },
      {
        name: 'Actuar',
        icon: 'track_changes',
        children: [
          {
            name: 'Acciones P&P según resultados',
            icon: '',
            children: [
            ],
            url: '',
          }, 
        ],
        url: 'actuar',
      },
    ]
  }
  
  public countries = [
    { code: 'ES', name: 'Español', flag: 'https://cdn-icons-png.flaticon.com/128/197/197575.png' },
    { code: 'EN', name: 'Ingles', flag: 'https://cdn-icons-png.flaticon.com/128/197/197484.png' },
  ];

  public currentLenguage = this.countries[0];

  ngOnInit(): void {
    // Inicializamos el estado de expansión
    this.navMenu.menu.forEach(item => item.isExpanded = false);
    console.log('menu completo', this.navMenu1);
  }

  // sidenavMode: 'side' | 'over' | 'push' = 'side';
  // isDrawerOpen = false;

  isDrawerOpen = false;
  isOpen = false;
  sidenavMode = 'side';

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.sidenavMode = this.isDrawerOpen ? 'over' : 'side'; 
    this.isOpen = !this.isOpen;
    if(!this.isOpen){
      this.navMenu1.forEach(item =>{
        if(item.isExpanded) item.isExpanded = false;
      })
    }
  }

  changeSidenavMode(event: any) {
    this.sidenavMode = event;
  }

  toggleItem(item: Items): void {
    item.isExpanded = !item.isExpanded;
  }
  toggleItem1(item: UserParams): void {
    item.isExpanded = !item.isExpanded;  
  }

  onMouseOver(){
    this.isDrawerOpen = true;
    this.isOpen = true;
  }

  public chancheLenguage(country: any): void {
    this.currentLenguage = country;
  }  

  public logout(){
    // this.spinner.show();
    // setTimeout(() => { 
    //   this.authService.logout().subscribe({
    //     next: () => this.spinner.hide(),
    //     // Levanta alerta de error al usuario
    //     error: (response) => {
    //       this.spinner.hide();
    //     } 
    //   })
    // }, 1000);
    this.authService.logout();
    // this.router.navigateByUrl('/sign-up');
  }

  reRirectPath(item: any){
    // En el componente de origen
    localStorage.setItem('submodules', JSON.stringify(item.submodules));
    console.log(item.moduleRoute);
    this.router.navigateByUrl(`dashboard/${item.moduleRoute}`); 
    // this.router.navigateByUrl('/planear');
  }

  reRirectPath1(item: any){
    // En el componente de origen
    localStorage.setItem('submodules1', JSON.stringify(item));
    console.log(item);
    const pathList = item.submoduleRoute.split('/');
    console.log(pathList);
    this.router.navigateByUrl(`dashboard/${pathList[0]}/${pathList[2]}`); 
    // this.router.navigateByUrl('dashboard/planear/capacitacion'); 
  }
  
}



