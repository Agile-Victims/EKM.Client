import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../shared/models/LoginRequest';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../../shared/models/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiName = 'auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest, type: string): Observable<any> {
    return this.http.post<any>(`${apiUrl}/${this.apiName}/login/${type}`, loginRequest);
  }

  setEmail(email: string){
    localStorage.setItem('email', email);
    this.loggedInSubject.next(true);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('email') !== null;
  }

  logout(){
    localStorage.removeItem('email');
    this.loggedInSubject.next(false);
  }

  getEmail(): string{
    const email = localStorage.getItem('email');
    if(email){
      return email;
    }

    return "";
  }
}
