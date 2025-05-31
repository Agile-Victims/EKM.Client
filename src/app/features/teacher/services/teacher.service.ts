import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { RegisterRequest } from '../../../shared/models/RegisterRequest';
import { AuthService } from '../../../shared/services/auth.service';

export interface TeacherProfile {
  firstName: string;
  lastName: string;
  email: string;
  classes: string;
  subjects?: { [lesson: string]: string };
}

export interface SubjectPayload {
  lesson: string;
  subject: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiName = 'teacher';

  constructor(private http: HttpClient, private authService: AuthService) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(
      `${apiUrl}/${this.apiName}/signup/`,
      registerRequest
    );
  }

  updateMyLessons(lessonsCsv: string): Observable<any> {
    const payload = {
      email:   this.authService.getEmail(),
      classes: lessonsCsv   // e.g. "Matematik-Fizik-İngilizce"
    };
    console.log('sending to backend:', payload);
    return this.http.put<any>(
      `${apiUrl}/${this.apiName}/set-classes`,
      payload
    );
  }

  getProfile(): Observable<TeacherProfile> {
    return this.http.get<TeacherProfile>(`${apiUrl}/${this.apiName}/get-my-info/${this.authService.getEmail()}`);
  }
}
