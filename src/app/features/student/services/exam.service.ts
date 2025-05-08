import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { ExamComplitionForm } from '../models/ExamComplitionForm';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  apiName = 'exam';

  constructor(private http: HttpClient) {}

  getExamById(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${this.apiName}/getExamById/${id}`);
  }

  completeExam(form: ExamComplitionForm): Observable<any> {
    return this.http.post<any>(`${apiUrl}/${this.apiName}/completeExam`, {form});
  }
}
