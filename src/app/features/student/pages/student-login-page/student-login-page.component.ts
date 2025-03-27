import { Component } from '@angular/core';
import { LoginComponent } from '../../../../shared/components/login/login.component';
import { StudentLoginService } from '../../services/student-login.service';
import { LoginRequest } from '../../../../shared/models/LoginRequest';

@Component({
  selector: 'app-student-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './student-login-page.component.html',
  styleUrls: ['./student-login-page.component.css']
})
export class StudentLoginPageComponent {

  constructor(private loginService: StudentLoginService){}

  handleLogin(credentials: { email: string, password: string }): void {
    const loginRequest = new LoginRequest(credentials.email, credentials.password);

      this.loginService.login(loginRequest).subscribe(
        (response) => {
          window.alert(`Giriş başarılı: ${response}` );
        },
        (error) => {
          window.alert(`Giriş başarısız` );
        }
      );
  }
}
