import { Component } from '@angular/core';
import { LoginComponent } from '../../../../shared/components/login/login.component';
import { LoginRequest } from '../../../../shared/models/LoginRequest';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-teacher-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './teacher-login-page.component.html',
  styleUrls: ['./teacher-login-page.component.css']
})
export class TeacherLoginPageComponent {
  constructor(private authService: AuthService){}
  
    handleLogin(credentials: { email: string, password: string }): void {
      const loginRequest = new LoginRequest(credentials.email, credentials.password);
  
      this.authService.login(loginRequest).pipe(
        tap(response => {
          window.alert(`Giriş başarılı`);
          console.log(response);
        }),
        catchError(error => {
          window.alert(`Giriş başarısız`);
          return throwError(() => error);
        })
      ).subscribe();
    }
}
