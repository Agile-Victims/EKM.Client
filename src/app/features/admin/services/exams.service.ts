import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { Exam } from '../../../shared/models/Exam';
import { ExamResult } from '../../../shared/models/ExamResult';

@Injectable({ providedIn: 'root' })
export class ExamsService {
  private readonly apiName = 'exams';

  constructor(private http: HttpClient) {}

  /** Tüm sınavları backend’den alır */
  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${apiUrl}/${this.apiName}/getAllExams`);
  }

  /** Yeni sınav ekler */
  addExam(exam: Partial<Exam>): Observable<Exam> {
    return this.http.post<Exam>(`${apiUrl}/${this.apiName}/createExam`, exam);
  }

  /** Sınavı pasife alır (active → false) */
  deactivateExam(examId: number): Observable<Exam> {
    return this.http.put<Exam>(
      `${apiUrl}/${this.apiName}/deactivateExam/${examId}`,
      {}
    );
  }


  getExamResults(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${this.apiName}/getResults/${id}`);
  }
}
