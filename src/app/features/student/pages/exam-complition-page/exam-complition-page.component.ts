import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ExamComplitionForm } from '../../models/ExamComplitionForm';

@Component({
  selector: 'app-exam-complition-page',
  imports: [FormsModule, NgFor],
  templateUrl: './exam-complition-page.component.html',
  styleUrl: './exam-complition-page.component.css'
})
export class ExamComplitionPageComponent implements OnInit{
  lessons = [
    { key: 'turkish', name: 'Türkçe', total: 0, correct: 0, wrong: 0 },
    { key: 'math', name: 'Matematik', total: 0, correct: 0, wrong: 0 },
    { key: 'science', name: 'Fen Bilimleri', total: 0, correct: 0, wrong: 0 },
    { key: 'history', name: 'Tarih', total: 0, correct: 0, wrong: 0 },
    { key: 'relegion', name: 'Din Kültürü', total: 0, correct: 0, wrong: 0 },
    { key: 'foreignLanguage', name: 'Yabancı Dil', total: 0, correct: 0, wrong: 0 }
  ];
  examId!: string;
  examComplitionForm: ExamComplitionForm = new ExamComplitionForm(
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  );

  constructor(private examService: ExamService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    this.examComplitionForm.id = +this.examId;
    this.examService.getExamById(this.examId).pipe(
      tap(response => {
        this.lessons[0].total = response.turkishQuestionCount;
        this.lessons[1].total = response.mathQuestionCount;
        this.lessons[2].total = response.scienceQuestionCount;
        this.lessons[3].total = response.historyQuestionCount;
        this.lessons[4].total = response.relegionQuestionCount;
        this.lessons[5].total = response.foreignLanguageQuestionCount;
      }),
      catchError(error => {
        window.alert(`Deneme bulunamadı`);
        this.router.navigate(['/student']);
        return throwError(() => error);
      })
    ).subscribe();
  }


  submitExam() {
    this.examComplitionForm.turkishCorrectCount = this.lessons[0].correct;
    this.examComplitionForm.turkishWrongCount = this.lessons[0].wrong;
    this.examComplitionForm.mathCorrectCount = this.lessons[1].correct;
    this.examComplitionForm.mathWrongCount = this.lessons[1].wrong;
    this.examComplitionForm.scienceCorrectCount = this.lessons[2].correct;
    this.examComplitionForm.scienceWrongCount = this.lessons[2].wrong;
    this.examComplitionForm.historyCorrectCount = this.lessons[3].correct;
    this.examComplitionForm.historyWrongCount = this.lessons[3].wrong;
    this.examComplitionForm.relegionCorrectCount = this.lessons[4].correct;
    this.examComplitionForm.relegionWrongCount = this.lessons[4].wrong;
    this.examComplitionForm.foreignLanguageCorrectCount = this.lessons[5].correct;
    this.examComplitionForm.foreignLanguageWrongCount = this.lessons[5].wrong;

    this.examService.completeExam(this.examComplitionForm).pipe(
      tap(response => {
        window.alert(`Deneme tamamlandı`);
        this.router.navigate(['/student/exams']);
      }),
      catchError(error => {
        window.alert(error);
        return throwError(() => error);
      })
    ).subscribe();
  }
}
