import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DocumentType } from "../../../enum/document-type.enum";
import { ResponsibleStatus } from "../../../enum/responsible-status.enum";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { PlanningService } from '../../../../../services/planning/planning.service';
import { ToastrAlertService } from '../../../../../services/toastr/toastr-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-responsible',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    CommonModule, 
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxSpinnerModule, 
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-responsible.component.html',
  styleUrl: './view-responsible.component.css'
})
export class ViewResponsibleComponent {
  private planningService = inject(PlanningService);
  private toastr = inject(ToastrAlertService);
  private spinner = inject(NgxSpinnerService);
  private formBuilder = inject(FormBuilder);
  private fb = inject(FormBuilder);
  
  public viewResponsibleForm!: FormGroup;
  public documentTypes = Object.values(DocumentType);
  public isDisabled: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ViewResponsibleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    const formValues = this.data[0];

    // Convertir las fechas desde el formato MM/DD/YYYY a Date
    const convertToDate = (dateString: string) => {
      const [month, day, year] = dateString.split('/');
      return new Date(+year, +month - 1, +day);
    };

    // Mapear el valor de estado recibido al enum
    const mapStatusToEnum = (status: string): ResponsibleStatus => {
      switch (status) {
        case 'Activo':
          return ResponsibleStatus.Activo;
        case 'Inactivo':
          return ResponsibleStatus.Inactivo;
        case 'Pendiente':
          return ResponsibleStatus.Pendiente;
        default:
          return ResponsibleStatus.Inactivo; // O cualquier valor por defecto que prefieras
      }
    };

    this.viewResponsibleForm = this.fb.group({
      responsibleDocumentType:          [formValues.responsibleDocumentType],
      responsibleDocumentNumber:        [formValues.responsibleDocumentNumber],
      responsibleExpeditionDate:        [convertToDate(formValues.responsibleExpeditionDate)],
      responsibleName:                  [formValues.responsibleName],
      responsibleLicenseNumber:         [formValues.responsibleLicenseNumber],
      responsibleLicenseExpireDate:     [convertToDate(formValues.responsibleLicenseExpireDate)],
      responsibleAsignDate:             [convertToDate(formValues.responsibleAsignDate)],
      responsibleDocumentNumberCompany: [formValues.responsibleDocumentNumberCompany],
      responsibleCompanyName:           [formValues.responsibleCompanyName],
      responsibleStatus:                [mapStatusToEnum(formValues.responsibleStatus)],
      responsibleUserCreate:            [formValues.responsibleCreateId],
      responsibleDateCreate:            [convertToDate(formValues.responsibleCreateDate)],
      responsibleHourCreate:            [formValues.responsibleCreateHour],
      responsibleDateUpdate:            [convertToDate(formValues.responsibleUpdateDate)],
      responsibleHourUpdate:            [formValues.responsibleUpdateHour],
      // Otros controles del formulario
    });

    // Aquí instanciamos el FormGroup y definimos los controles
    // this.viewResponsibleForm = this.formBuilder.group({
    //   responsibleDocumentType:          [formValues.responsibleDocumentType],
    //   responsibleDocumentNumber:        [formValues.responsibleDocumentNumber],
    //   responsibleExpeditionDate:        [formValues.responsibleExpeditionDate],
    //   responsibleName:                  [formValues.responsibleName],
    //   responsibleLicenseNumber:         [formValues.responsibleLicenseNumber],
    //   responsibleLicenseExpireDate:     [formValues.responsibleExpeditionDate],
    //   responsibleAsignDate:             [formValues.responsibleExpeditionDate],
    //   responsibleDocumentNumberCompany: [formValues.responsibleDocumentNumberCompany],
    //   responsibleCompanyName:           [formValues.responsibleCompanyName],
    //   responsibleStatus:                ['Activo  🟢'],
    //   responsibleUserCreate:            ['Angelo Mateo Bessolo Rueda'],
    //   responsibleDateCreate:            [formValues.responsibleExpeditionDate],
    //   // Otros controles del formulario
    // });
  }

  closeDialog(): void {
    this.dialogRef.close({
      status: false,
      data: {}
    });
  }

}
