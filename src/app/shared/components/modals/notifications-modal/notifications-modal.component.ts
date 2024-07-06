import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { RouterOutlet, RouterLink } from '@angular/router';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion',
  title: string;
}

@Component({
  selector: 'app-notifications-modal',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatSidenavModule, 
    MatTreeModule, 
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.css'
})
export class NotificationsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificationsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
