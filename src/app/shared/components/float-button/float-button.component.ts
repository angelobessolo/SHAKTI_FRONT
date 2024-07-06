import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-float-button',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './float-button.component.html',
  styleUrl: './float-button.component.css'
})
export class FloatButtonComponent {
  addTransaction(): void {
    console.log('Agregar transacción');
  }

  modifyTransaction(): void {
    console.log('Modificar transacción');
  }

  deleteTransaction(): void {
    console.log('Eliminar transacción');
  }
}
