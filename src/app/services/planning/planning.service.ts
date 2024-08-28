import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Responsible } from '../../pages/planear/interfaces/responsible.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Documents1 } from '../../pages/planear/interfaces/documents.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  

  constructor() { }

  getResponsibles(): Observable<Responsible[]>{
    const url = `${this.baseUrl}/planear/recursos/responsable`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.get<Responsible[]>(url, { headers} )
      .pipe(
        map( res => {
          // console.log(res);
          return res;
        }),

        // Return Errors
        catchError( err =>{
          // console.log(err);
          return throwError(() => err);
        })
      )
  }

  createResponsible(responsible: Responsible): Observable<Responsible[]>{
    const url = `${this.baseUrl}/planear/recursos/responsable`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.post<Responsible[]>(url, responsible, { headers} )
      .pipe(
        map( res => {
          // console.log(res);
          return res;
        }),

        // Return Errors
        catchError( err =>{
          // console.log(err);
          return throwError(() => err);
        })
      )
  }

  deleteResponsible(responsible: Responsible[]): Observable<Responsible[]>{

    // Primero, mapeamos a obtener los IDs, y luego filtramos para asegurarnos de que no sean undefine
    const responsiblesId = responsible.map(responsible => responsible._id).filter((id): id is string => id !== undefined);
    // console.log('array', responsiblesId)
    const url = `${this.baseUrl}/planear/recursos/responsable`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.delete<Responsible[]>(url, {headers: headers, body: responsiblesId} )
      .pipe(
        map( res => {
          // console.log(res);
          return res;
        }),

        // Return Errors
        catchError( err =>{
          // console.log(err);
          return throwError(() => err);
        })
      )
  }

  getResponsibleDocuments(documentNumberResponsible: number): Observable<Documents1[]>{
    const url = `${this.baseUrl}/planear/recursos/responsable/get-documents`;
    const token = localStorage.getItem('token');
    const body = {documentNumberResponsible}
    
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);


    return this.http.post<Documents1[]>(url, { documentNumberResponsible }, { headers: headers })
      .pipe(
        map( res => {
          // console.log(res);
          return res;
        }),

        // Return Errors
        catchError( err =>{
          // console.log(err);
          return throwError(() => err);
        })
      )
  }

  uploadFileResponsible(values: any, file: File){
    const url = `${this.baseUrl}/planear/recursos/responsable/documents/upload`;
    const token = localStorage.getItem('token');

    // Crear un FormData y agregar los valores y el archivo
    const formData: FormData = new FormData();
    formData.append('responsibleId', values.responsibleId);
    formData.append('documentType', values.documentType);
    formData.append('file', file);

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.post(url, formData, { headers} )
      .pipe(
        map( res => {
          // console.log('cargando documento', res);
          return res;
        }),

        // Return Errors
        catchError( err =>{
          // console.log(err);
          return throwError(() => err);
        })
      )
  }

  uploadMassiveFileResponsible(value: any, file: File){
    const url = `${this.baseUrl}/planear/recursos/responsable/documents/upload`;
      const token = localStorage.getItem('token');

      // Crear un FormData y agregar los valores y el archivo
      const id = value.responsibleId
      const formData: FormData = new FormData();
      formData.append('responsibleId', id);
      formData.append('documentType', value.documentType);
      formData.append('file', file);

      const headers = new HttpHeaders()
        .set('Authorization',`Bearer ${token}`);

      return this.http.post(url, formData, { headers} )
        .pipe(
          map( res => {
            // console.log('cargando documento', res);
            return res;
          }),

          // Return Errors
          catchError( err =>{
            // console.log(err);
            return throwError(() => err);
          })
        )

  }

  deleteFileResponsible(id: string){
    const url = `${this.baseUrl}/planear/recursos/responsable/documents/deleteById`;
    const token = localStorage.getItem('token');

    // Parámetros de la URL
    const params = new HttpParams().set('documentId', id);

    // Encabezados
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(url, { headers, params} )
      .pipe(
        map( res => {
          // console.log('cargando documento', res);
          return res;
        }),

        // Return Errors
        catchError( err =>{
          // console.log(err);
          return throwError(() => err);
        })
      )

  }

  generateDocument(value: any){
    console.log('consumo');
    const url = `${this.baseUrl}/report/modify`;
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders()
        .set('Authorization',`Bearer ${token}`);

      return this.http.post(url, value, { headers} )
        .pipe(
          map( res => {
            // console.log('cargando documento', res);
            return res;
          }),

          // Return Errors
          catchError( err =>{
            // console.log(err);
            return throwError(() => err);
          })
        )

  }

  getResponsiblesAssignments(): Observable<Responsible[]>{
    const url = `${this.baseUrl}/planear/recursos/asignaciones-responsable`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.get<Responsible[]>(url, { headers} )
      .pipe(
        map( res => {
          // console.log(res);
          return res;
        }),

        // Return Errors
        catchError( err =>{
          // console.log(err);
          return throwError(() => err);
        })
      )
  }
  
}
