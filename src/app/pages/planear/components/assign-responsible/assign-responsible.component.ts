import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { PlanningService } from '../../../../services/planning/planning.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrAlertService } from '../../../../services/toastr/toastr-alert.service';
import { Documents, Documents1, RequiredResponsibleDocumentsMain } from '../../interfaces/documents.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { Company } from '../../../configuracion/interfaces/company.interface';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-assign-responsible',
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
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './assign-responsible.component.html',
  styleUrl: './assign-responsible.component.css'
})
export class AssignResponsibleComponent implements OnInit {
  private planningService = inject(PlanningService);
  private configurationService = inject(ConfigurationService);
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

  public companies: Company[] = [];


  selectedCompany: any;
  formCompany = new FormControl('', Validators.required);


  @ViewChild('representante', { static: true }) representante!: ElementRef;
  @ViewChild('documentoRepresentante', { static: true }) documentoRepresentante!: ElementRef;
  // @ViewChild('nombreResponsable', { static: true }) nombreResponsable!: ElementRef;
  // @ViewChild('documentoEmpresa', { static: true }) documentoEmpresa!: ElementRef;
  // @ViewChild('numeroLicencia', { static: true }) numeroLicencia!: ElementRef;
  // @ViewChild('fechaLicencia', { static: true }) fechaLicencia!: ElementRef;


  constructor(
    private dialogRef: MatDialogRef<AssignResponsibleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
 

  ngOnInit(): void {
    console.log(this.data);
    this.formCompany = new FormControl('', Validators.required);
    
    this.getCompanies();
  }


  closeDialog(): void {

    this.dialogRef.close({
      status: this.processData,
      data: {}
    });
  }
 
  combineDocument() {
    console.log(this.selectedCompany);
    const formattedDate = this.data[0].responsibleLicenseExpireDate.split('/');

    const values: any = {
      responsibleId: this.data[0]._id,
      companyId: this.selectedCompany._id,
      legalRepresentativeNameField1:  this.selectedCompany.companyName,
      documentNumberField: String(this.selectedCompany.companyDocumentNumber),
      assignedCompanyNameField: this.data[0].responsibleName,
      assignedCompanyDocumentNumberField: this.data[0].responsibleDocumentNumber,
      assignedCompanyExpeditionCityField: this.data[0].responsibleExpeditionCity,
      assignedCompanyLicenseNumberField: this.data[0].responsibleLicenseNumber,
      companyRepresentativeName: this.selectedCompany.companyRepresentativeName,
      assignedCompanyLicenseDayField: formattedDate[0],
      assignedCompanyLicenseMonthField: formattedDate[1],
      assignedCompanyLicenseYearField: formattedDate[2],
    }
    console.log(values);
    this.combineDocumentResponsible(values);
  }

  combineDocumentResponsible(values: any){
    this.loadingUpload = true;
    setTimeout(() => {
      this.planningService.generateDocument(values).subscribe({
        next: (response: any) => {
          const title = 'Combinación de documento';
          const message = response.message;
          if (response.statusCode === 200){
            this.toastr.showSucces(title, message);
            this.processData = true;

            this.downloadPdf(response.data.responsibleDocument.document, response.data.responsibleDocument.documentName);
          }else {
            this.toastr.showError(title, message);
          }
        },
        error: err => {
          // console.error('Error al realizar la peticion: ', err);
          const title = 'Combinación de documento';
          const message = err.message;
          this.toastr.showError(title, message);
        }
      })
      this.loadingUpload = false;
    }, 500)
  }

  downloadPdf(base64String: string, documentName: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = documentName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getCompanies(){
    setTimeout(() =>{
      this.configurationService.getCompanies().subscribe({
        next: (response: any) => {
          console.log('llega data al front ', response );
          this.companies = response.data.companies;
          const data = this.companies.map((company: any) => ({
            _id:                                  company._id,
            companyName:                          company.companyName,
            responsibleDocumentNumber:            company.companyDocumentType,
            companyDocumentType:                  company.companyDocumentType,
            companyDocumentNumber:                company.companyDocumentNumber,
            companyCity:                          company.companyCity,
            companyAddress:                       company.companyAddress,
            companyPhoneNumber:                   company.companyPhoneNumber,
            companyEmail:                         company.companyEmail,
            companyIndustry:                      company.companyIndustry, 
            companyWebsite:                       company.companyWebsite,
            companyRepresentativeName:            company.companyRepresentativeName,  
            companyRepresentativeTypeDocument:    company.companyRepresentativeTypeDocument,  
            companyRepresentativeDocumentNumber:  company.companyRepresentativeDocumentNumber,   
            companyRepresentativeEmail:           company.companyRepresentativeEmail,   
            companyRepresentativePhoneNumber:     company.companyRepresentativePhoneNumber,  
            companyUpdateDate:                    new Date(company.companyUpdateDate).toLocaleDateString(),  
            companyUpdateHour:                    company.companyUpdateHour,    
            companyCreateDate:                    new Date(company.companyCreateDate).toLocaleDateString(),   
            companyCreateHour:                    company.companyCreateHour,   
          }));
        },
        error: err => {
          console.error('Error al realizar la peticion: ', err);
        }
      })
    },
    500
    );
  }  

  onCompanyChange(event: any){
    this.selectedCompany = this.companies.find(company => company._id === event.value || event);
    console.log('Empresa seleccionada:', this.selectedCompany);
  }
  
}
