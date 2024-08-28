import { Component, EventEmitter, HostListener, Inject, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrAlertService } from '../../../../services/toastr/toastr-alert.service';
import { PlanningService } from '../../../../services/planning/planning.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Documents, Documents1, RequiredResponsibleDocuments, RequiredResponsibleDocumentsMain } from '../../interfaces/documents.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  private planningService = inject(PlanningService);
  private toastr = inject(ToastrAlertService);
  private spinner = inject(NgxSpinnerService);
  private formBuilder = inject(FormBuilder);
  private fb = inject(FormBuilder);
  
  public viewResponsibleForm!: FormGroup;
  public documentTypes = Object.values(DocumentType);
  public isDisabled: boolean = true;

  firstFormGroup: FormGroup = this.formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this.formBuilder.group({secondCtrl: ['']});


  isHovered = false;
  isUploading = false;
  
  uploadProgress = 0;
  files: File[] = [];
  isDocumentUploaded = false; // Nueva propiedad

  selectedIndex = 0; // Ningún paso seleccionado por defecto

  documents: Documents[] = [
    {
      title:      'Licensia SST',
      documents:  [],  
      status:      false,
      disabled:    false
    },
    {
      title:      'Curso 20/50 Horas',
      documents:  [],  
      status:      false,
      disabled:    false
    },
    {
      title:      'Hoja de Vida',
      documents:  [],  
      status:      false,
      disabled:    false
    },
    {
      title:      'Anexos',
      documents:  [],  
      status:      false,
      disabled:    false
    }
  ];

  documents1: RequiredResponsibleDocumentsMain = {
    statusDocumentation:          '',
    RequiredResponsibleDocuments: []
  };

  loadingUpload: boolean = false;

  processData: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<DocumentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  this.getResponsileDocuments();      
  }

  closeDialog(): void {

    this.dialogRef.close({
      status: this.processData,
      data: {}
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHovered = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isHovered = false;
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    this.isHovered = false;

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length > 0) {
      this.handleFiles(files, index);
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.handleFiles(files, index);
    }
  }

  handleFiles(files: File[], index: number) {
    this.documents[index].documents?.push(...files);
    if (this.documents[index].documents.length > 0){
      this.documents[index].status = true;
      this.documents[index].disabled = true;


      const valuesFile: Documents1 = {
        id:                 '',
        documentNumber:     0,
        documentType:       this.documents1.RequiredResponsibleDocuments[index].type,
        documentName:       files[0].name,   
        documentNamePath:   files[0].name, 
        documentPath:       '', 
        documentSize:       `${files[0].size} bytes`,  
        documentExtention:  '',  
        documentCreateId:   '',
        documentUpdateDate: '',
        documentUpdateHour: '',
        documentCreateDate: '',
        documentCreateHour: '',
      }

      this.documents1.RequiredResponsibleDocuments[index].documents.push(valuesFile);
      this.documents1.RequiredResponsibleDocuments[index].pendingDocuments = files[0];
      this.documents1.RequiredResponsibleDocuments[index].uploadFile = true;
      // this.documents1.RequiredResponsibleDocuments[index].status = true;
      this.documents1.RequiredResponsibleDocuments[index].disabled = true;

    }

    this.uploadFiles(files);
  }

  uploadFiles(files: File[]) {
    this.isUploading = true;
    let totalSize = files.reduce((sum, file) => sum + file.size, 0);
    let loaded = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        loaded += file.size;
        this.uploadProgress = (loaded / totalSize) * 100;
        if (this.uploadProgress === 100) {
          this.isUploading = false;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  removeFile(documents: any, index: number) {
    // if(this.documents[index].documents.length > 0){
    //   this.documents[index].documents.splice(index, 1);
    //   if (this.documents[index].documents.length > 0){
    //     this.documents[index].status = true;
    //   }else{
    //     this.documents[index].status = false;
    //     this.documents[index].disabled = false;
    //   }
    // }

    // if(this.documents1.RequiredResponsibleDocuments[index].documents.length > 0){
    //   this.documents1.RequiredResponsibleDocuments[index].documents.splice(index, 1);
    //   if (this.documents1.RequiredResponsibleDocuments[index].documents.length > 0){
    //     this.documents1.RequiredResponsibleDocuments[index].status = true;
    //   }else{
    //     this.documents1.RequiredResponsibleDocuments[index].uploadFile = false;
    //     this.documents1.RequiredResponsibleDocuments[index].status = false;
    //     this.documents1.RequiredResponsibleDocuments[index].disabled = false;
    //   }
    // }

    this.loadingUpload = true;
    setTimeout(() => {
      for(let i = 0; i < documents.length; i++){
        this.planningService.deleteFileResponsible(documents[i]._id).subscribe({
          next: (response: any) => {
            if (response.statusCode === 200){
              this.documents1.RequiredResponsibleDocuments[index].status = false;
              this.documents1.RequiredResponsibleDocuments[index].disabled  = false;
              this.documents1.RequiredResponsibleDocuments[index].documents  = [];
              const title = 'Eliminación de documento';
              const message = response.message;
              this.toastr.showSucces(title, message);
              this.processData = true;
            }
          },
          error: err => {
            // console.error('Error al realizar la peticion: ', err);
          }
        })
      } 
      this.loadingUpload = false;
    }, 500)

  }

  uploadFile(file: any, i: number) {
    const values = {
      responsibleId: this.data[0]._id,
      documentType: file.documentType
    }

    this.uploadFileResponsible(values, this.documents1.RequiredResponsibleDocuments[i].pendingDocuments!);
  }

  uploadMassiveFile() {
    let valuesMassive: any[] = [];
    let valuesMassiveFiles: any[] = [];
    this.documents1.RequiredResponsibleDocuments.forEach((element, index) => {
      if(element.pendingDocuments){
        const values = {
          responsibleId: this.data[0]._id,
          documentType: element.type
        }
        valuesMassive.push(values); // Añadir el objeto al array

        const files = {
          index: index,
          file: element.pendingDocuments
        }
        valuesMassiveFiles.push(files);
      }
    });
    
    const result = this.uploadMassiveFileResponsible(valuesMassive, valuesMassiveFiles)
    if (result){
      valuesMassiveFiles = [];
      valuesMassive = [];
      this.documents1.RequiredResponsibleDocuments.forEach((element) => {
        if(element.pendingDocuments){
          delete element.pendingDocuments;
        }
      });
    }
  }

  isLastIndex(index: number): boolean {
    return index === this.documents.length - 1;
  }

  getResponsileDocuments(){
    
    setTimeout(() =>{
      this.planningService.getResponsibleDocuments(this.data[0].responsibleDocumentNumber).subscribe({
        next: (response: any) => {
          this.documents1 = response.data.documents
        },
        error: err => {
          // console.error('Error al realizar la peticion: ', err);
        }
      })
    },
    100
    );
  }

  uploadFileResponsible(values: any, file: File){
    this.loadingUpload = true;
    setTimeout(() => {
      this.planningService.uploadFileResponsible(values, file).subscribe({
        next: (response: any) => {
          if (response.statusCode === 200){
            const title = 'Cargue de documento';
            const message = response.message;
            this.toastr.showSucces(title, message);
            this.processData = true;
          }
        },
        error: err => {
          // console.error('Error al realizar la peticion: ', err);
        }
      })
      this.loadingUpload = false;
    }, 2000);
  }

  uploadMassiveFileResponsible(values: any[], file: any): boolean{
    this.loadingUpload = true;
    setTimeout(() => {
      for(let i = 0; i < values.length; i++){
        this.planningService.uploadMassiveFileResponsible(values[i], file[i].file).subscribe({
          next: (response: any) => {
            if (response.statusCode === 200){
              this.documents1.RequiredResponsibleDocuments[file[i].index].status = true;
              this.documents1.RequiredResponsibleDocuments[file[i].index].documents.splice(0, 1);
              this.documents1.RequiredResponsibleDocuments[file[i].index].documents.push(response.data.responsible);
              delete this.documents1.RequiredResponsibleDocuments[file[i].index].pendingDocuments;
              const title = 'Cargue de documento';
              const message = response.message;
              this.toastr.showSucces(title, message);
              this.processData = true;
            }
          },
          error: err => {
            // console.error('Error al realizar la peticion: ', err);
          }
        })
      } 
      this.loadingUpload = false;
    }, 500)
    return true;
  }
  
}
