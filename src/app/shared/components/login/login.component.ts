import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() title: string = 'Login';
  @Input() theme: 'student' | 'teacher' | 'admin' = 'student';
  @Input() registerLink: string = '/student/register';
  @Output() onLogin: EventEmitter<{ email: string; password: string }> =
    new EventEmitter<{ email: string; password: string }>();

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // Validate email using a basic regex pattern.
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password: minimum 8 characters, at least one uppercase letter, one number, and one symbol (including . and ,).
  validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,-])[A-Za-z\d!@#$%^&*.,-]{8,}$/;
    return passwordRegex.test(password);
  }

  submitLogin(): void {
    // Reset error message on every submission
    this.errorMessage = '';

    // Check email structure
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Hatalı mail formatı, lütfen kontrol edin';
      return;
    }

    // Check password structure
    if (!this.validatePassword(this.password)) {
      this.errorMessage =
        'Şifre en az 8 karakter, bir büyük harf, bir sayı ve bir sembol içermelidir';
      return;
    }

    // If both validations pass, emit the login event
    this.onLogin.emit({ email: this.email, password: this.password });
  }
}
