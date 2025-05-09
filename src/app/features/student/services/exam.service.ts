import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../shared/models/ApiUrl';
import { ExamCompletionDTO } from '../models/ExamCompletionDTO';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  apiName = 'exams';

  constructor(private http: HttpClient) {}

  getExamById(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${this.apiName}/getExamById/${Number(id)}`);
  }

  completeExam(form: ExamCompletionDTO): Observable<any> {
    console.log(form)
    return this.http.post<any>(`${apiUrl}/${this.apiName}/completeExam`, form);
  }
}
