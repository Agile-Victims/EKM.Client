import { Component } from '@angular/core';
import { RegisterComponent } from '../../../../shared/components/register/register.component';

@Component({
  selector: 'app-teacher-register-page',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './teacher-register-page.component.html',
  styleUrls: ['./teacher-register-page.component.css']
})
export class TeacherRegisterPageComponent {
  handleRegister(credentials: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): void {
    // Temporary dummy registration handler.
    window.alert(`Register received:\nName: ${credentials.firstName} ${credentials.lastName}\nEmail: ${credentials.email}`);
  }
}


// import { Component } from '@angular/core';
// import { RegisterComponent } from 'path-to-register-component/register.component';
// import { TeacherRegisterService } from '../../services/teacher-register.service';
// import { RegisterRequest } from 'path-to-models/register-request.model';

// @Component({
//   selector: 'app-teacher-register-page',
//   standalone: true,
//   imports: [RegisterComponent],
//   templateUrl: './teacher-register-page.component.html',
//   styleUrls: ['./teacher-register-page.component.css']
// })
// export class TeacherRegisterPageComponent {

//   constructor(private registerService: TeacherRegisterService) {}

//   handleRegister(credentials: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): void {
//     const registerRequest = new RegisterRequest(credentials.firstName, credentials.lastName, credentials.email, credentials.password);
//     this.registerService.register(registerRequest).subscribe(
//       (response) => {
//         window.alert(`Kayıt başarılı: ${response}`);
//       },
//       (error) => {
//         window.alert(`Kayıt başarısız`);
//       }
//     );
//   }
// }
