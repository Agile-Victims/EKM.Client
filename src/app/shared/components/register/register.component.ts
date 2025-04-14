import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() title: string = 'Register';
  @Input() theme: 'student' | 'teacher' = 'student';
  @Output() onRegister: EventEmitter<{ firstName: string; lastName: string; email: string; password: string; confirmPassword: string }> =
    new EventEmitter();

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  // Validate email with a basic regex.
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password: must be at least 8 characters, including one uppercase, one number and one symbol.
  validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,-])[A-Za-z\d!@#$%^&*.,-]{8,}$/;
    return passwordRegex.test(password);
  }

  submitRegister(): void {
    this.errorMessage = '';

    if (!this.firstName.trim() || !this.lastName.trim()) {
      this.errorMessage = 'Lütfen isim ve soy isim giriniz';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Geçerli bir mail adresi giriniz';
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.errorMessage = 'Şifre en az 8 karakter, bir büyük harf, bir sayı ve bir sembol içermelidir';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Şifreler eşleşmiyor';
      return;
    }

    // If validations pass, emit the registration event with the entered data.
    this.onRegister.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }
}
