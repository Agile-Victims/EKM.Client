import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() title: string = 'Login';
  // New theme input to control style dynamically:
  @Input() theme: 'student' | 'teacher' | 'admin' = 'student';
  @Output() onLogin: EventEmitter<{ email: string; password: string }> =
    new EventEmitter<{ email: string; password: string }>();

  email: string = '';
  password: string = '';

  submitLogin(): void {
    this.onLogin.emit({ email: this.email, password: this.password });
  }
}
