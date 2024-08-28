import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PlanningService } from '../../../../../../services/planning/planning.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FloatButtonComponent } from '../../../../../../shared/components/float-button/float-button.component';
import { ToastrAlertService } from '../../../../../../services/toastr/toastr-alert.service';
import { ThemePalette } from '@angular/material/core';
import { Responsible } from '../../../../../planear/interfaces/responsible.interface';
import { FloatButton } from '../../../../../../shared/interfaces/float-button-interface';
import { MatDialog } from '@angular/material/dialog';
import { ResponsibleStatus } from '../../../../../planear/enum/responsible-status.enum';
import { AssignResponsibleComponent } from '../../../../../planear/components/assign-responsible/assign-responsible.component';
import { DocumentsComponent } from '../../../../../planear/components/documents/documents.component';
import { ViewResponsibleComponent } from '../../../../../planear/components/forms/view-responsible/view-responsible.component';
import { CreateCompanyComponent } from '../../../../components/forms/create-company/create-company.component';
import { ConfigurationService } from '../../../../../../services/configuration/configuration.service';
import { Company } from '../../../../interfaces/company.interface';

export interface DocumentData {
  _id:                    string;
  companyName:            string;
  companyDocumentType:    string;
  companyDocumentNumber:  string;
  companyCity:            string;
  companyAddress:         string;
  companyPhoneNumber:     string;
  companyEmail:           string;
  companyIndustry:        string;
  companyWebsite:         string;
   companyRepresentativeName:          string;
  companyRepresentativeTypeDocument:   string;
  companyRepresentativeDocumentNumber: string;  
  companyRepresentativeEmail:          string;
  companyRepresentativePhoneNumber:    string;
  companyUpdateDate:                   string;
  companyUpdateHour:                   string;
  companyCreateDate:                   string;
  companyCreateHour:                   string;
}
  

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    FloatButtonComponent,
  ],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent implements OnInit{
  
  private configurationService = inject(ConfigurationService)
  private spinner         = inject(NgxSpinnerService);
  private toastr          = inject(ToastrAlertService);

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 70;


  displayedColumns: string[] = [ 
    'Numero Documento',  
    'Nombre Empresa', 
    'Correo Electronico', 
    'Nombre Representante',
    'Fecha Creación', 
  ]; 

  columnMappings: { [key: string]: string } = {
    'Numero Documento':     'companyDocumentNumber',
    'Nombre Empresa':       'companyName',
    'Correo Electronico':   'companyEmail',
    'Nombre Representante': 'companyRepresentativeName',
    'Fecha Creación':       'companyCreateDate',
  };


  // Tables and pagination with angular material
  dataSource = new MatTableDataSource<DocumentData>([]);
  public companies: Company[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Flag load service responsibles
  public loadService: boolean = false;

  // Flag to show float-button component
  public showButton: boolean = false;

  // Responsibles selected in the table
  public rowCompany: Company[] = [];

  public buttonActions: FloatButton = {};

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getCompanies();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getColumnValue(element: DocumentData, column: string): any {
    return element[this.columnMappings[column] as keyof DocumentData] || '';
  }

  selectedRowList(raw: any){
   
    
    raw.selectedRow = ! raw.selectedRow;
    // this.showButton = !this.showButton;

    if (raw.selectedRow){
      this.rowCompany.push(raw);
    }else{
      const index = this.rowCompany.findIndex(company => company._id === raw._id);
      if (index !== -1) {
        this.rowCompany.splice(index, 1);
      }
    }

    if (this.rowCompany.length > 0) {
      this.showButton = true;
    }else {
      this.showButton = false;
    }


    if(this.rowCompany.length > 1){
      this.buttonActions= {
        action: 'none',
        icon: 'widgets',
        label: '',
        color: 'primary',
        subActions: [
          { action: 'delete', 
            icon: 'delete', 
            label: 'Eliminar', 
            color: 'primary' 
          },
        ]
      }
    }else{
      this.buttonActions= {
        action: 'none',
        icon: 'widgets',
        label: '',
        color: 'primary',
        subActions: [
          { action: 'view', 
            icon: 'visibility', 
            label: 'Visualizar', 
            color: 'primary' 
          },
          { action:'update', 
            icon: 'edit', 
            label: 'Actualizar', 
            color: 'primary' 
          },
          { action: 'delete', 
            icon: 'delete', 
            label: 'Eliminar', 
            color: 'primary' 
          },
        ]
      }
    }

    console.log(this.rowCompany, this.buttonActions);
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
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.loadService = true;
        },
        error: err => {
          console.error('Error al realizar la peticion: ', err);
        }
      })
    },
    500
    );
  }

  eventAction(event: any){
    console.log(event);
    switch (event.action){
      case 'delete':
        this.spinner.show();
        setTimeout(() => {
          this.configurationService.deleteCompany(this.rowCompany).subscribe({
            next: (response: any) => {
              if(response.statusCode === 200){
                this.spinner.hide();
  
                const title = 'Eliminacion Responsable';
                const message = response.message;
                this.toastr.showSucces(title, message);

                this.rowCompany = [];

                this.reloadList();

                this.showButton = false;
              }   
            },
            error: err => {
              this.spinner.hide();
  
              const title = 'Eliminacion Empresa';
              const message = err.error.error;
              this.toastr.showSucces(title, message);
            }
          });
        }, 
        1000
        );

      break; 

      case 'view':
        this.viewCompany(this.rowCompany);
      break;
    }
  }

  openCreateCompany(){
    console.log('abre');
    const dialogRef = this.dialog.open(CreateCompanyComponent,{
      width: '75%',
      disableClose: true,
    });
    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      appRoot.classList.add('blur-background'); // Añadir clase al app-root
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result.status){
        this.reloadList();
      }
      if (appRoot) {
        appRoot.classList.remove('blur-background'); // Quitar clase del app-root
      }
      
    });
  }

  viewCompany(rowCompany: Company[]): void {
    console.log('abre view', rowCompany);
    const dialogRef = this.dialog.open(ViewResponsibleComponent,{
      data: rowCompany,
      width: '75%',
      disableClose: true,
    });
    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      appRoot.classList.add('blur-background'); // Añadir clase al app-root
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result.status){
        this.reloadList();
      }
      if (appRoot) {
        appRoot.classList.remove('blur-background'); // Quitar clase del app-root
      }
    });
  }

  reloadList(): void{
    this.dataSource.data = [];
    this.rowCompany = [];
    this.showButton = false;
    this.rowCompany = [];
    this.loadService = false;
    this.getCompanies();
  }
}

