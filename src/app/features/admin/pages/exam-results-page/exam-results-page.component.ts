import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { ExamResult } from '../../../../shared/models/ExamResult';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-exam-results-page',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterModule],
  templateUrl: './exam-results-page.component.html',
  styleUrls: ['./exam-results-page.component.css']
})
export class ExamResultsPageComponent implements OnInit {
  examId!: number;
  results: ExamResult[] = [];

  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private examSvc: ExamsService
  ) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadResults();
  }

  private loadResults(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.examSvc.getExamResults(this.examId).pipe(
      tap(response => {
        console.log(response)
        this.results = response;
        this.isLoading = false;
      }),
      catchError(error => {
        console.error('Failed to load exam results', error);
        this.errorMessage = 'Sonuçlar yüklenirken hata oluştu.';
        this.isLoading = false;
        return throwError(() => error);
      })
    ).subscribe();
  }
}
