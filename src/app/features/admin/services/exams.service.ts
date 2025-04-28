import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { Exam } from '../../../shared/models/Exam';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private readonly apiName = 'admin/exams';

  constructor(private http: HttpClient) {}

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${apiUrl}/${this.apiName}`);
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${apiUrl}/${this.apiName}`, exam);
  }

  deactivateExam(examId: number): Observable<Exam> {
    return this.http.put<Exam>(`${apiUrl}/${this.apiName}/${examId}`, {});
  }
}
