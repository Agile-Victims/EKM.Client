import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../models/ApiUrl';
import { SubjectPayload } from '../../features/teacher/services/teacher.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private readonly apiName = 'subjects';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSubjects(lesson: string): Observable<{subjectName: string, id:number}[]> {
    return this.http.get<{subjectName: string, id:number}[]>(`${apiUrl}/${this.apiName}/getSubjects/${lesson}`);
  }

  addSubject(lesson: string, subject: string): Observable<any> {
    const payload: SubjectPayload = {
      lesson,
      subject
    };
    
    return this.http.post<any>(`${apiUrl}/${this.apiName}/addSubject`, payload);
  }

  deleteSubject(lesson: string, subjectName: string): Observable<any> {
    return this.http.delete<any>(
      `${apiUrl}/${this.apiName}/deleteSubject/${lesson}/${subjectName}}`
    );
  }
}
