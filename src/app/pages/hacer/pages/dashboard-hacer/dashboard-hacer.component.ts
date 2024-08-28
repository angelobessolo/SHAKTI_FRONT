import { ChangeDetectionStrategy, Component, OnInit, inject, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { SubmoduleResponse } from '../../../../shared/interfaces/nav-menu-interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-hacer',
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-hacer.component.html',
  styleUrl: './dashboard-hacer.component.css'
})
export class DashboardHacerComponent implements OnInit{
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
