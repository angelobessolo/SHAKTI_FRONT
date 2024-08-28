import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from '../../../../services/planning/planning.service';
import { ConfiguracionRoutingModule } from '../../configuracion-routing.module';

interface Operation {
  action: string;
  routeAction: string;
}

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-parametrizacion-sistema',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatDividerModule,
    ConfiguracionRoutingModule,
  ],
  templateUrl: './parametrizacion-sistema.component.html',
  styleUrl: './parametrizacion-sistema.component.css'
})
export class ParametrizacionSistemaComponent implements OnInit{
  
  private planningService = inject(PlanningService);
  private router          = inject(Router);
  private route           = inject(ActivatedRoute);

  selectedValue: string   = '';
  selectedCar: string     = '';

  operations: Operation[] = [
    {action: '1. Empresas',  routeAction: '/empresas'},
  ];

  ngOnInit(): void {
  }

  navigate(route: string) {
    const currentUrl = this.router.url; // Obtener la URL actual
    const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')); // Obtener la base de la URL actual
    console.log(baseUrl);
    this.router.navigateByUrl(`dashboard/configuracion/parametrizacion-sistema${route}`);
    // this.router.navigateByUrl(`${baseUrl}/recursos${route}`);
    // this.router.navigate([route], { relativeTo: this.route });
  }

  
}

