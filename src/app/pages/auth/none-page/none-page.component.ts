import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-none-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './none-page.component.html',
  styleUrl: './none-page.component.css'
})
export class NonePageComponent {
  // private router          = inject(Router);
  // private route           = inject(ActivatedRoute);

  // constructor (){

  // }

}
