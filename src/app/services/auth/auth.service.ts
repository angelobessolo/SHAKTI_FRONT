import { Inject, Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckToken, LoginResponse, User } from '../../pages/auth/interfaces/index-auth';
import { ThisReceiver } from '@angular/compiler';
import { DOCUMENT } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private spinner = inject(NgxSpinnerService);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );


  public currenUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  // constructor() {
  //   this.checkAuthStatus().subscribe();
  // }

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) { 
      this.checkAuthStatus().subscribe();
    }

    // this.checkAuthStatus().subscribe();
  }
 

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of (false);
    }

    const headers = new HttpHeaders()
      .set('Authorization',`Barer ${token}`);

      return this.http.get<CheckToken>(url, { headers} )
        .pipe(
          map(({token, user}) => this.setAuthentication(user, token)),

          // Return Errors
          catchError(() => {
            this._authStatus.set(AuthStatus.notAuthenticated);
            return of(false)
          })
        )
  }


  login(email: string, password: string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(res =>{
          const { user, token, userParams } = res;
          const userParamsJsonString = JSON.stringify(userParams) ;
          const encodedString = btoa(userParamsJsonString);
          localStorage.setItem('userParams', encodedString);
          this.setAuthentication(user, token);
          return true;
        }),
          

        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  private setAuthentication(user: User, token: string): boolean{
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
    return of(true);
  }

  showSpinner(){
     /** spinner starts on init */
     this.spinner.show();

     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 5000);
  }


}
