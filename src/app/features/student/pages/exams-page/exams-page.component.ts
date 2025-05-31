import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../../shared/models/Exam';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { catchError, forkJoin, of, tap } from 'rxjs';


@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css'],
  imports: [NgFor, RouterLink, NgIf]
})
export class ExamsPageComponent implements OnInit {
  exams: Exam[] = [];
  completedExamIds: number[] = [];

  constructor(
    private examService: ExamService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentEmail = this.authService.getEmail();
    
    this.examService.getExams().pipe(
      tap(response => {
        this.exams = response;
        console.log(this.exams)
        if(this.exams.length === 0){
          window.alert("Deneme bulunmamaktadır");
          this.router.navigate(['/student']);
        }
      }),
      catchError(error => {
        window.alert("Deneme bulunmamaktadır");
        this.router.navigate(['/student']);
        return of(null);
      })
    ).subscribe();

    this.examService.getCompletedExamsByStudentEmail(studentEmail).pipe(
      tap(response => {
        this.completedExamIds = response;
      }),
      catchError(error => {
        return of(null);
      })
    ).subscribe();
  }

  isExamCompleted(examId: number): boolean {
    return this.completedExamIds.includes(examId);
  }
}
