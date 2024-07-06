import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './shared/material/material.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { AuthStatus } from './pages/auth/interfaces/auth-status.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MaterialComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  private authService = inject(AuthService);
  private router      = inject(Router);

  public finishedAuthCheck = computed<boolean>( () => {
    console.log(this.authService.authStatus() )
    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });


  public authStatusChangedEffect = effect(() => {
    console.log(this.authService.authStatus());
    switch( this.authService.authStatus() ) {

      case AuthStatus.checking:
      return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/sign-in');
        return;

    }
  });
}
