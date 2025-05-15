import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { ExamCompletionDTO } from '../models/ExamCompletionDTO';
import { Exam } from '../../../shared/models/Exam';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  apiName = 'exams';

  constructor(private http: HttpClient) {}

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${apiUrl}/${this.apiName}/getAllExams`);
  }
  

  getExamById(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${this.apiName}/getExamById/${Number(id)}`);
  }

  completeExam(form: ExamCompletionDTO): Observable<any> {
    console.log(form)
    return this.http.post<any>(`${apiUrl}/${this.apiName}/completeExam`, form);
  }

  getCompletedExamsByStudentEmail(email: string): Observable<number[]> {
    return this.http.get<number[]>(`${apiUrl}/${this.apiName}/studentCompletedExams/${email}`);
  }
}
