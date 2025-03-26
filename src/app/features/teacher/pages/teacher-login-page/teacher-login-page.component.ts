import { Component } from '@angular/core';
import { LoginComponent } from '../../../../shared/components/login/login.component';


@Component({
  selector: 'app-teacher-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './teacher-login-page.component.html',
  styleUrls: ['./teacher-login-page.component.css']
})
export class TeacherLoginPageComponent {
  handleLogin(credentials: { email: string, password: string }): void {
    // Replace this with your teacher login API call or business logic.
    console.log('Teacher credentials:', credentials);
  }
}
