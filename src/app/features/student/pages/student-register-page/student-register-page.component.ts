import { Component } from '@angular/core';
import { RegisterComponent } from '../../../../shared/components/register/register.component';
import { StudentService } from '../../services/student.service';
import { RegisterRequest } from '../../../../shared/models/RegisterRequest';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-student-register-page',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './student-register-page.component.html',
  styleUrls: ['./student-register-page.component.css']
})
export class StudentRegisterPageComponent {
  constructor(private studentService: StudentService){}
  handleRegister(credentials: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): void {
   const registerRequest = new RegisterRequest(credentials.firstName, credentials.lastName, credentials.email, credentials.password);
    this.studentService.register(registerRequest).pipe(
    tap(response => {
      window.alert(`Kayıt başarılı`);
      console.log(response);
    }),
    catchError(error => {
      window.alert(`Kayıt başarısız`);
      return throwError(() => error);
    })
  ).subscribe();
  }
}
