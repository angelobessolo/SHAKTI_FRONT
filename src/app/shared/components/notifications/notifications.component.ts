import { Component } from '@angular/core';
import { FloatButtonComponent } from '../float-button/float-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { RouterOutlet, RouterLink } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { NotificationsModalComponent } from '../modals/notifications-modal/notifications-modal.component';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    FloatButtonComponent,
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
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  constructor(public dialog: MatDialog) {}

  public visualizeNotifications(): void {
    const dialogRef = this.dialog.open(NotificationsModalComponent, {
      disableClose: false,
      width: '400px', // Ajusta el ancho del diálogo
      height: '85vh', // Ajusta la altura del diálogo
      position: {
        top: '70px', // Centrando verticalmente
        right: '0' // Centrando horizontalmente
      },
      panelClass: 'custom-dialog-container',
      data: {
        animal: 'panda',
        title: 'Notification Title',
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      let respuesta = res;
      if (!respuesta) {
        respuesta = { event: 'close', status: false, data: [] };
      }
      // this.closeComponent(respuesta);
    });
  }
}
