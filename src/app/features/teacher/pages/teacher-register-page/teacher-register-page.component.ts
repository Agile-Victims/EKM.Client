import { Component } from '@angular/core';
import { RegisterComponent } from '../../../../shared/components/register/register.component';
import { TeacherService } from '../../services/teacher.service';
import { RegisterRequest } from '../../../../shared/models/RegisterRequest';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-register-page',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './teacher-register-page.component.html',
  styleUrls: ['./teacher-register-page.component.css']
})
export class TeacherRegisterPageComponent {
  constructor(private teacherService: TeacherService, private router: Router){}
    handleRegister(credentials: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): void {
     const registerRequest = new RegisterRequest(credentials.firstName, credentials.lastName, credentials.email, credentials.password);
      this.teacherService.register(registerRequest).pipe(
      tap(response => {
        window.alert(`Kayıt başarılı`);
        this.router.navigate(['/teacher/login']);
      }),
      catchError(error => {
        window.alert(`Kayıt başarısız`);
        return throwError(() => error);
      })
    ).subscribe();
    }
}