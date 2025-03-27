import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../../shared/models/LoginRequest';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  apiName = "admin";

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${apiUrl}/auth/login/${this.apiName}`, loginRequest);
  }
}
