import { ChangeDetectionStrategy, Component, inject, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PlanearRoutingModule } from '../../../planear/planear-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmoduleResponse } from '../../../../shared/interfaces/nav-menu-interface';
import { ConfiguracionRoutingModule } from '../../configuracion-routing.module';

@Component({
  selector: 'app-dashboard-configuracion',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ConfiguracionRoutingModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-configuracion.component.html',
  styleUrl: './dashboard-configuracion.component.css'
})
export class DashboardConfiguracionComponent implements OnInit{
  public submodules: SubmoduleResponse[] = [];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const submodulesString = localStorage.getItem('submodules');
    if (submodulesString) {
      this.submodules = JSON.parse(submodulesString);
    }
    console.log(this.submodules);
  }

  accordion = viewChild.required(MatAccordion);
}
