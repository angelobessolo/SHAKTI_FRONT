import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { City } from '../../interfaces/city-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private http = inject(HttpClient);
  constructor() { }

  getCities(): Observable<string[]> {
    const url = 'https://api-colombia.com/api/v1/City';

    return this.http.get<City[]>(url).pipe(
      map(res => res.map(city => city.name)), // Mapear para obtener solo los nombres
      catchError(err => {
        // Manejar errores
        return throwError(() => err);
      })
    );
  }
}
