import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CreateResponsibleComponent } from '../../../../components/forms/create-responsible/create-responsible.component';
import { PlanningService } from '../../../../../../services/planning/planning.service';
import { Responsible } from '../../../../interfaces/responsible.interface';
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ResponsibleStatus } from "../../../../enum/responsible-status.enum";
import { MatButtonModule } from '@angular/material/button';
import { FloatButtonComponent } from '../../../../../../shared/components/float-button/float-button.component';
import { ToastrAlertService } from '../../../../../../services/toastr/toastr-alert.service';
import { ViewResponsibleComponent } from '../../../../components/forms/view-responsible/view-responsible.component';
import { FloatButton } from '../../../../../../shared/interfaces/float-button-interface';
import { DocumentsComponent } from '../../../../components/documents/documents.component';
import { AssignResponsibleComponent } from '../../../../components/assign-responsible/assign-responsible.component';
import {MatTabsModule } from '@angular/material/tabs';
import { AssignListComponent } from '../../../../components/lists/assign-list/assign-list.component';
import { ResponsibleListComponent } from '../../../../components/lists/responsible-list/responsible-list.component';

export interface DocumentData {
  responsibleDocumentType:          string;
  responsibleDocumentNumber:        string;
  responsibleExpeditionDate:        string;
  responsibleName:                  string;
  responsibleLicenseNumber:         string;
  responsibleLicenseExpireDate:     string;
  responsibleExpeditionCity:        string;
  responsibleStatus:                string;
  responsibleCreateDate:            string; 
  responsibleCreateHour:            string;
  responsibleUpdateDate:            string;
  responsibleUpdateHour:            string;
  selectedRow?:                     boolean;
}


@Component({
  selector: 'app-responsable',
  standalone: true,
  imports: [
    AssignListComponent,
    ResponsibleListComponent,
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
    MatTabsModule,
  ],
  templateUrl: './responsable.component.html',
  styleUrl: './responsable.component.css'
})

export class ResponsableComponent implements OnInit, AfterViewInit {

  private planningService = inject(PlanningService)
  private spinner         = inject(NgxSpinnerService);
  private toastr          = inject(ToastrAlertService);

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 70;


  displayedColumns: string[] = [ 
    'Numero Documento',  
    'Nombre Responsable', 
    'Numero Licencia', 
    // 'Fecha Asignacion', 
    // 'Nit Empresa', 
    // 'Nombre Empresa',
    'Estado',
    'Fecha Creación', 
  ]; 

  columnMappings: { [key: string]: string } = {
    'Numero Documento':   'responsibleDocumentNumber',
    'Nombre Responsable': 'responsibleName',
    'Numero Licencia':    'responsibleLicenseNumber',
    'Estado':             'responsibleStatus',
    'Fecha Creación':      'responsibleCreateDate',
    'id':                 '_id',
  };


  // Tables and pagination with angular material
  dataSource = new MatTableDataSource<DocumentData>([]);
  public responsibles: Responsible[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Flag load service responsibles
  public loadService: boolean = false;

  // Flag to show float-button component
  public showButton: boolean = false;

  // Responsibles selected in the table
  public rowResponsibles: Responsible[] = [];

  public buttonActions: FloatButton = {};

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getResponsiles();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('Paginator:', this.paginator); // Verifica si el paginator está disponible después del tiempo de espera
      console.log('Sort:', this.sort); // Verifica si el sort está disponible después del tiempo de espera
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
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
      this.rowResponsibles.push(raw);
    }else{
      const index = this.rowResponsibles.findIndex(responsible => responsible._id === raw._id);
      if (index !== -1) {
        this.rowResponsibles.splice(index, 1);
      }
    }

    if (this.rowResponsibles.length > 0) {
      this.showButton = true;
    }else {
      this.showButton = false;
    }

    if(this.rowResponsibles.length > 1){
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
      if(this.rowResponsibles[0].responsibleStatus === ResponsibleStatus.Activo){
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
            { action: 'documents', 
              icon: 'folder_open', 
              label: 'Documentacion', 
              color: 'primary' 
            },
            { action: 'assign', 
              icon: 'edit_document', 
              label: 'Asignar', 
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
            { action: 'documents', 
              icon: 'folder_open', 
              label: 'Documentacion', 
              color: 'primary' 
            },
          ]
        }
      }
      
    }

    console.log(this.rowResponsibles);
  }

  openCreateResponsible(){
    console.log('abre');
    const dialogRef = this.dialog.open(CreateResponsibleComponent,{
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

  getResponsiles(){
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

    setTimeout(() =>{
      this.planningService.getResponsibles().subscribe({
        next: (response: any) => {
          console.log('llega data al front ', response );
          this.responsibles = response.data.responsibles;
          const data = this.responsibles.map((responsible: any) => ({
            _id:                              responsible._id,
            responsibleDocumentType:          responsible.responsibleDocumentType,
            responsibleDocumentNumber:        responsible.responsibleDocumentNumber,
            responsibleExpeditionDate:        responsible.responsibleExpeditionDate,
            responsibleName:                  responsible.responsibleName,
            responsibleLicenseNumber:         responsible.responsibleLicenseNumber,
            responsibleLicenseExpireDate:     new Date(responsible.responsibleLicenseExpireDate).toLocaleDateString(),
            responsibleStatus:                mapStatusToEnum(responsible.responsibleStatus),
            responsibleExpeditionCity:        responsible.responsibleExpeditionCity, 
            responsibleCreateId:              responsible.responsibleCreateId,
            responsibleCreateDate:            new Date(responsible.responsibleCreateDate).toLocaleDateString(),  
            responsibleCreateHour:            responsible.responsibleCreateHour,  
            responsibleUpdateDate:            new Date(responsible.responsibleUpdateDate).toLocaleDateString(),   
            responsibleUpdateHour:            responsible.responsibleUpdateHour,   
          }));
          this.dataSource.data = data;
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort; 
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
          this.planningService.deleteResponsible(this.rowResponsibles).subscribe({
            next: (response: any) => {
              if(response.statusCode === 200){
                this.spinner.hide();
  
                const title = 'Eliminacion Responsable';
                const message = response.message;
                this.toastr.showSucces(title, message);

                this.rowResponsibles = [];

                this.reloadList();

                this.showButton = false;
              }   
            },
            error: err => {
              this.spinner.hide();
  
              const title = 'Eliminacion Responsable';
              const message = err.error.error;
              this.toastr.showSucces(title, message);
            }
          });
        }, 
        1000
        );

      break; 

      case 'view':
        this.viewResponsible(this.rowResponsibles);
      break;

      case 'documents':
        this.documentation(this.rowResponsibles);
      break;

      case 'assign':
        this.assign(this.rowResponsibles);
      break;
    }
  }

  viewResponsible(rowResponsibles: Responsible[]): void {
    console.log('abre view', rowResponsibles);
    const dialogRef = this.dialog.open(ViewResponsibleComponent,{
      data: rowResponsibles,
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

  documentation(rowResponsibles: Responsible[]): void {
    console.log('abre view', rowResponsibles);
    const dialogRef = this.dialog.open(DocumentsComponent,{
      data: rowResponsibles,
      width: '75%',
      height: '95%',
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

  assign(rowResponsibles: Responsible[]): void {
    console.log('abre view', rowResponsibles);
    const dialogRef = this.dialog.open(AssignResponsibleComponent,{
      data: rowResponsibles,
      width: '600px',
      height: '570',
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
    this.responsibles = [];
    this.showButton = false;
    this.rowResponsibles = [];
    this.loadService = false;
    this.getResponsiles();
  }

}
