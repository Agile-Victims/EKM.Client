import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { RegisterRequest } from '../../../shared/models/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  apiName = 'teacher';

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${apiUrl}/${this.apiName}/register/`, registerRequest);
  }
}
