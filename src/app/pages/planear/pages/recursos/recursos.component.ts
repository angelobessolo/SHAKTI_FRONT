import { Component, OnInit, inject } from '@angular/core';
import { PlanearRoutingModule } from '../../planear-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from '../../../../services/planning/planning.service';

interface Operation {
  action: string;
  routeAction: string;
}

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [
    CommonModule,
    PlanearRoutingModule,
    FormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.css'
})
export class RecursosComponent implements OnInit{
  
  private planningService = inject(PlanningService);
  private router          = inject(Router);
  private route           = inject(ActivatedRoute);

  selectedValue: string   = '';
  selectedCar: string     = '';

  operations: Operation[] = [
    {action: '1. Responsable',  routeAction: '/responsable'},
    {action: '2. Responsabilidades', routeAction: '/responsabilidades'},
    {action: '3. Asignación de recursos', routeAction: '/asignacion-recursos'},
    {action: '4. Afiliación al SSST', routeAction: '/afiliacion-sst'}, 
    {action: '5. Funcionamiento COPASST', routeAction: '/funcionamiento-copasst'},
    {action: '6. Capacitación COPASST', routeAction: '/capacitacion-copasst'}, 
    {action: '7. Funcionamiento CCL', routeAction: '/funcionamiento-ccl'},
  ];

  public flgRouter = false;

  ngOnInit(): void {
  }

  navigate(route: string) {
    const currentUrl = this.router.url; // Obtener la URL actual
    const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')); // Obtener la base de la URL actual
    console.log(baseUrl);
    this.router.navigateByUrl(`dashboard/planear/recursos${route}`);
    this.flgRouter = true;

    // this.router.navigateByUrl(`${baseUrl}/recursos${route}`);
    // this.router.navigate([route], { relativeTo: this.route });
  }

  
}
