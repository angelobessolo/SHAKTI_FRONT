import { ChangeDetectionStrategy, Component, OnInit, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmoduleResponse } from '../../../../shared/interfaces/nav-menu-interface';
import { PlanearRoutingModule } from '../../planear-routing.module';

@Component({
  selector: 'app-dashboard-planear',
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
    PlanearRoutingModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-planear.component.html',
  styleUrl: './dashboard-planear.component.css'
})
export class DashboardPlanearComponent implements OnInit{
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
