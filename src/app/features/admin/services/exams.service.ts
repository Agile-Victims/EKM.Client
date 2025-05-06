import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Exam } from '../../../shared/models/Exam';
import { ExamResult } from '../../../shared/models/ExamResult';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private mockExams: Exam[] = [
    new Exam(1, 'Deneme 1', 10, 10, 10, 10, 10, 10, true),
    new Exam(2, 'Deneme 2', 15, 15, 15, 15, 15, 15, true),
  ];
  private nextExamId = 3;

  private resultsUrl = (examId: number) => `assets/${examId}-results.json`;

  constructor(private http: HttpClient) {}

  getExams(): Observable<Exam[]> {
    return of(this.mockExams).pipe(delay(300));
  }

  addExam(exam: Partial<Exam>): Observable<Exam> {
    const newExam = new Exam(
      this.nextExamId++,
      exam.examName!,
      exam.turkishQuestionCount!,
      exam.mathQuestionCount!,
      exam.scienceQuestionCount!,
      exam.historyQuestionCount!,
      exam.relegionQuestionCount!,
      exam.foreignLanguageQuestionCount!,
      true
    );
    this.mockExams.push(newExam);
    return of(newExam).pipe(delay(300));
  }

  deactivateExam(examId: number): Observable<Exam> {
    const ex = this.mockExams.find(e => e.id === examId);
    if (ex) ex.active = false;
    return of(ex!).pipe(delay(200));
  }

  getExamResults(examId: number): Observable<ExamResult[]> {
    return this.http
      .get<ExamResult[]>(this.resultsUrl(examId))
      .pipe(delay(200));
  }
}

// Gerçek API ile çalışmak için aşağıdaki kod kullanalılacak. Assets içindeki dosyalar kullanılmayacak.

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { apiUrl } from '../../../shared/models/ApiUrl';
// import { Exam } from '../../../shared/models/Exam';
// import { ExamResult } from '../../../shared/models/ExamResult';

// @Injectable({ providedIn: 'root' })
// export class ExamsService {
//   private readonly apiName = 'admin/exams';

//   constructor(private http: HttpClient) {}

//   /** Tüm sınavları backend’den alır */
//   getExams(): Observable<Exam[]> {
//     return this.http.get<Exam[]>(`${apiUrl}/${this.apiName}`);
//   }

//   /** Yeni sınav ekler */
//   addExam(exam: Partial<Exam>): Observable<Exam> {
//     return this.http.post<Exam>(`${apiUrl}/${this.apiName}`, exam);
//   }

//   /** Sınavı pasife alır (active → false) */
//   deactivateExam(examId: number): Observable<Exam> {
//     return this.http.put<Exam>(
//       `${apiUrl}/${this.apiName}/${examId}/deactivate`,
//       {}
//     );
//   }

//   /** Belirli bir sınavın sonuçlarını alır */
//   getExamResults(examId: number): Observable<ExamResult[]> {
//     return this.http.get<ExamResult[]>(
//       `${apiUrl}/${this.apiName}/${examId}/results`
//     );
//   }
// }
