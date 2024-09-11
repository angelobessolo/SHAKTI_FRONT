import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MaterialComponent } from '../../../shared/material/material.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrAlertService } from '../../../services/toastr/toastr-alert.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MaterialComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule, 
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent implements OnInit, OnDestroy {

  private formBuilder = inject(FormBuilder);
  private router      = inject(Router);
  private authService = inject(AuthService);
  private toastr      = inject(ToastrAlertService);
  private spinner     = inject(NgxSpinnerService);

  @ViewChild('container')
  container!: ElementRef;


  // Variables de formulario
  public loginForm = this.formBuilder.group({
    email: ['admin@gmail.com', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
    password: ['admin125', [Validators.required, Validators.minLength(8)]],
    
  });

  public isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
  }

  public rotationState = 'start';
  public animationFrame: any;

  public hide = true;

  errorMessage = '';

  constructor() {}

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }

  public loopAnimation(): void {
    this.rotationState = this.rotationState === 'start' ? 'end' : 'start';
    setTimeout(() => {
      this.loopAnimation();
    }, 1000); // Same duration as the 'start => end' transition
  }

  public signIn() {
    this.container.nativeElement.classList.remove('right-panel-active');
  } 

  public signUp() {
    this.container.nativeElement.classList.add('right-panel-active');
  }

  public getFloatLabelValue(): string {
    return this.loginForm.get('password')?.value || 'auto';
  }

  public clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  // Validaciones personalizadas del formulario
  public updateErrorMessage(fieldName: string) {
    const control = this.loginForm.get(fieldName);
    if (!control) return; 
    
    const fieldValue = control.value; // Obtener el valor del campo del formulario
    console.log(fieldValue);
    this.errorMessage = '';
    switch (fieldName){
      case 'email':  
        if (control.touched && control.hasError('required') && fieldValue == '') {
          this.errorMessage = 'Campo requerido';
        } else if (control.touched && control.hasError('pattern')) {
          this.errorMessage = 'Campo no cumple con el patron, debe tener una estructura: example@example.example';
        } else {
          this.errorMessage = '';
        }
      break;

      case 'password':  
        console.log(fieldValue.length);
        if (control.touched && fieldValue == '') {
          this.errorMessage = 'Campo requerido';
        } else if (control.touched  && fieldValue.length < 8) {
          this.errorMessage = 'Longitud de contraseña debe ser mayor a 8 caracteres';
          control.setErrors({ invalid: true }); // Marcar el campo como inválido
        } else {
          this.errorMessage = '';
        }
      break;
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public submitForm(): void{
    const {email, password} = this.loginForm.value;

    if(email && password){
      this.spinner.show();
      setTimeout(() => { 
        this.authService.login(email, password).subscribe({
          // Redirecciona a el dashboard si la autenticación es valida
          next: () => {
            this.spinner.hide();
            this.router.navigateByUrl('dashboard');
          },
          // Levanta alerta de error al usuario
          error: (response) => {
            this.spinner.hide();
            const title = 'Login Response';
            const message = response.error.message
            this.toastr.showError(title, message);
          } 
        })
      }, 100);
    } 
  }
}


