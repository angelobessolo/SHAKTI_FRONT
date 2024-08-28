import { ChangeDetectionStrategy, Component, OnInit, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SubmoduleResponse } from '../../../../shared/interfaces/nav-menu-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-actuar',
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
  templateUrl: './dashboard-actuar.component.html',
  styleUrl: './dashboard-actuar.component.css'
})
export class DashboardActuarComponent implements OnInit{
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
