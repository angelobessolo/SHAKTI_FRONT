import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxDocViewerModule } from 'ngx-doc-viewer';



@Component({
  selector: 'app-view-pdf',
  standalone: true,
  imports: [
    NgxDocViewerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './view-pdf.component.html',
  styleUrl: './view-pdf.component.css'
})
export class ViewPdfComponent {

  constructor(
    private dialogRef: MatDialogRef<ViewPdfComponent>,
  ){

  }

  closeDialog(): void {
    this.dialogRef.close({
      status: false,
      data: {}
    });
  }
}
