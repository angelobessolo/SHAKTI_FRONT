import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Company } from '../../pages/configuracion/interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  getCompanies(): Observable<Company[]>{
    const url = `${this.baseUrl}/configuration/getAllCompanies`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.get<Company[]>(url, { headers} )
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

  createCompany(responsible: Company): Observable<Company[]>{
    console.log()
    const url = `${this.baseUrl}/configuration/createCompany`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.post<Company[]>(url, responsible, { headers} )
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

  deleteCompany(responsible: Company[]): Observable<Company[]>{

    // Primero, mapeamos a obtener los IDs, y luego filtramos para asegurarnos de que no sean undefine
    const responsiblesId = responsible.map(responsible => responsible._id).filter((id): id is string => id !== undefined);
    // console.log('array', responsiblesId)
    const url = `${this.baseUrl}/configuration/deleteCompany`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

    return this.http.delete<Company[]>(url, {headers: headers, body: responsiblesId} )
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
