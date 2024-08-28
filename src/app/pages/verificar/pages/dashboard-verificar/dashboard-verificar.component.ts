import { ChangeDetectionStrategy, Component, OnInit, inject, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmoduleResponse } from '../../../../shared/interfaces/nav-menu-interface';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard-verificar',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-verificar.component.html',
  styleUrl: './dashboard-verificar.component.css'
})
export class DashboardVerificarComponent implements OnInit{
  public submodules: SubmoduleResponse[] = [];
  
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  ngOnInit(): void {
    const submodulesString = localStorage.getItem('submodules');
    if (submodulesString) {
      this.submodules = JSON.parse(submodulesString);
    }
    console.log(this.submodules);
  }

  accordion = viewChild.required(MatAccordion);
}
