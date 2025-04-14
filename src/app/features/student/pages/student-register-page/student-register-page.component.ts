import { Component } from '@angular/core';
import { RegisterComponent } from '../../../../shared/components/register/register.component';

@Component({
  selector: 'app-student-register-page',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './student-register-page.component.html',
  styleUrls: ['./student-register-page.component.css']
})
export class StudentRegisterPageComponent {
  handleRegister(credentials: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): void {
    // Temporary dummy registration handler.
    window.alert(`Register received:\nName: ${credentials.firstName} ${credentials.lastName}\nEmail: ${credentials.email}`);
  }
}


// import { Component } from '@angular/core';
// import { RegisterComponent } from 'path-to-register-component/register.component';
// import { StudentRegisterService } from '../../services/student-register.service';
// import { RegisterRequest } from 'path-to-models/register-request.model';

// @Component({
//   selector: 'app-student-register-page',
//   standalone: true,
//   imports: [RegisterComponent],
//   templateUrl: './student-register-page.component.html',
//   styleUrls: ['./student-register-page.component.css']
// })
// export class StudentRegisterPageComponent {

//   constructor(private registerService: StudentRegisterService) {}

//   handleRegister(credentials: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): void {
//     // Create a registration request (typically, you might not send the confirmPassword)
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
