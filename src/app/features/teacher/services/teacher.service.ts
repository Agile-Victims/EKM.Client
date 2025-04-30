import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { RegisterRequest } from '../../../shared/models/RegisterRequest';

export interface TeacherProfile {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiName = 'teacher';

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(
      `${apiUrl}/${this.apiName}/signup/`,
      registerRequest
    );
  }

  getMyLessons(): Observable<string[]> {
    return of(['Matematik']);
    // Gerçek API geldiğinde:
    // return this.http.get<string[]>(
    //   `${apiUrl}/${this.apiName}/lessons`
    // );
  }

  updateMyLessons(lessons: string[]): Observable<any> {
    console.log('Backend’e gidecek payload:', lessons);
    return of({ success: true });
    // Gerçek API geldiğinde:
    // return this.http.put<any>(
    //   `${apiUrl}/${this.apiName}/lessons`,
    //   { lessons }
    // );
  }

  getProfile(): Observable<TeacherProfile> {
    // Demo verisi:
    return of({
      firstName: 'Ayşe',
      lastName:  'Öztürk',
      email:     'ayse.ozturk@example.com'
    });

    // Gerçek API geldiğinde:
    // return this.http.get<TeacherProfile>(
    //   `${apiUrl}/${this.apiName}/profile`
    // );
  }
}
