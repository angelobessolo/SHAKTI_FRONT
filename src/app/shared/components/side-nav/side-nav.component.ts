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
import { Items, NavMenu, UserParams } from '../../interfaces/nav-menu-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatButtonComponent } from '../float-button/float-button.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NotificationsComponent } from '../notifications/notifications.component';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from '../../../services/auth/auth.service';




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
  private router = inject(Router);

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
  
  constructor(
    router: Router
  ) {}

  ngOnInit(): void {
    // Inicializamos el estado de expansión
    this.navMenu.menu.forEach(item => item.isExpanded = false);
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
    this.authService.logout();
    // this.router.navigateByUrl('/sign-up');
  }
  
}



