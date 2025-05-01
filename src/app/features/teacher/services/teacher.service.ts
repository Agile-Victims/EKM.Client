import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { RegisterRequest } from '../../../shared/models/RegisterRequest';
import { AuthService } from '../../../shared/services/auth.service';
import { SetClassesRequest } from '../../../shared/models/SetClassesRequest';

export interface TeacherProfile {
  firstName: string;
  lastName: string;
  email: string;
  classes: string
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


  /*updateeMyLessons(lessons: string): Observable<any> {
    const setClassesRequest: SetClassesRequest = new SetClassesRequest(this.authService.getEmail(), lessons);
    console.log(setClassesRequest)
    return this.http.put<any>(`${apiUrl}/${this.apiName}/set-classes`, { setClassesRequest });
  }*/

  getProfile(): Observable<TeacherProfile> {
    return this.http.get<TeacherProfile>(`${apiUrl}/${this.apiName}/get-my-info/${this.authService.getEmail()}`);
  }
}
