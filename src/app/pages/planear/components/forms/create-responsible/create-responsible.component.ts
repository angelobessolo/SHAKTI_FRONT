import { ChangeDetectionStrategy, Component, Inject, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerIntl, MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PlanningService } from '../../../../../services/planning/planning.service';
import { ToastrAlertService } from '../../../../../services/toastr/toastr-alert.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DocumentType } from '../../../../../shared/enums/document-type.enum';
import { MatMomentDateModule, MomentDateAdapter, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { map, Observable, startWith } from 'rxjs';
import { CitiesService } from '../../../../../shared/services/cities/cities.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import * as moment from 'moment';
moment.locale('es');  // Cambiar el idioma globalmente a español

// Formato de fecha personalizado (DD/MM/YYYY)
export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-create-responsible',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Idioma español
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    provideMomentDateAdapter(),
    provideNativeDateAdapter(),

  ],
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
    MatMomentDateModule,
    NgxMatSelectSearchModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-responsible.component.html',
  styleUrl: './create-responsible.component.css'
})
export class CreateResponsibleComponent  implements OnInit {
  
  private planningService = inject(PlanningService);
  private citiesService = inject(CitiesService);
  private toastr = inject(ToastrAlertService);
  private spinner = inject(NgxSpinnerService);
  private formBuilder = inject(FormBuilder);
  private fb = inject(FormBuilder);
  createResponsibleForm!: FormGroup;
  documentTypes = Object.values(DocumentType);


  // Métodos para filtrar la lista de códigos Ciudad
  filteredCities!: Observable<string[]>; // Observable para las opciones filtradas
  citySearchCtrl = new FormControl(); // Control para la búsqueda

  cities: string[] = []; //

  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly dateFormatString = computed(() => {
    if (this._locale() === 'es-ES') {
      return 'DD/MM/AAAA';
    } else {
      return 'MM/DD/YYYY';
    }
    return '';
  });


  constructor(
    private dialogRef: MatDialogRef<CreateResponsibleComponent>,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string,
  ) {
    this.adapter.setLocale('es');
    
  }



  ngOnInit(): void {
    // Aquí instanciamos el FormGroup y definimos los controles
    this.createResponsibleForm = this.formBuilder.group({
      responsibleDocumentType:          ['', Validators.required],
      responsibleDocumentNumber:        ['', Validators.required],
      responsibleExpeditionDate:        [null, Validators.required],
      responsibleName:                  ['', Validators.required],
      responsibleLicenseNumber:         ['', Validators.required],
      responsibleLicenseExpireDate:     [null, Validators.required],
      responsibleExpeditionCity:        ['', Validators.required],
      // Otros controles del formulario
    });
    
    this.citiesService.getCities().subscribe({
      next: (response: any[]) => {
        this.cities = response;
        console.log(this.cities);

        // Configuración del observable de filtrado
        this.filteredCities = this.citySearchCtrl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterCity(value || ''))
        );
        // this.spinner.hide();

        // if (appRoot) {
        //   appRoot.classList.add('blur-background'); // Añadir clase al app-root
        // }

        // if (response.statusCode === 200) {
        //   const title = 'Creacion Responsble';
        //   const message = response.message;
        //   this.toastr.showSucces(title, message);
        //   this.dialogRef.close({
        //     status: true,
        //     data: response
        //   });
        // }
      },
      error: err => {
        this.spinner.hide();

        // if (appRoot) {
        //   appRoot.classList.add('blur-background'); // Añadir clase al app-root
        // }

        // const title = 'Creacion Responsable';
        // const message = err.error.error;
        // this.toastr.showError(title, message);
      }
    })
  }

  filterCity(value: string): string[] {
    console.log('Valor ingresado para filtrar:', value); // Verificar el valor ingresado
    const filterValue = value;
    const result = this.cities.filter(city => city.includes(filterValue));
    console.log('Resultado del filtrado:', result); // Verificar el resultado del filtrado
    return result;
  }

  closeDialog(): void {
    this.dialogRef.close({
      status: false,
      data: {}
    });
  }

  createResponsible(): void {
    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      appRoot.classList.remove('blur-background'); // Quitar clase del app-root
    }

    this.spinner.show();
    setTimeout(() => {
      if (appRoot) {
        appRoot.classList.remove('blur-background'); // Añadir clase al app-root
      }

      this.planningService.createResponsible(this.createResponsibleForm.value).subscribe({
        next: (response: any) => {
          this.spinner.hide();

          if (appRoot) {
            appRoot.classList.add('blur-background'); // Añadir clase al app-root
          }

          if (response.statusCode === 200) {
            const title = 'Creacion Responsble';
            const message = response.message;
            this.toastr.showSucces(title, message);
            this.dialogRef.close({
              status: true,
              data: response
            });
          }
        },
        error: err => {
          this.spinner.hide();

          if (appRoot) {
            appRoot.classList.add('blur-background'); // Añadir clase al app-root
          }

          const title = 'Creacion Responsable';
          const message = err.error.error;
          this.toastr.showError(title, message);
        }
      })
    }, 
    1000
    );
  }
  
}
