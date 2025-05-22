import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../models/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private readonly apiName = 'subject';

  constructor(private http: HttpClient) {}

  getSubjects(lesson: string): Observable<{subject: string, id:number}[]> {
    return this.http.get<{subject: string, id:number}[]>(`${apiUrl}/${this.apiName}/getSubjects/${lesson}`);
  }
}
