import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExamsService } from '../../services/exams.service';
import { Exam } from '../../../../shared/models/Exam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams-page',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css'],
})
export class ExamsPageComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examSvc: ExamsService, private router: Router) {}

  ngOnInit(): void {
    this.loadExams();
  }

  private loadExams(): void {
    this.examSvc.getExams().subscribe({
      next: (exams) => (this.exams = exams),
      error: (err) => console.error('Failed to load exams', err),
    });
  }

  onClose(id: number): void {
    const exam = this.exams.find((e) => e.id === id);
    if (exam) {
      this.examSvc.deactivateExam(id).subscribe({
        next: (updatedExam) => {
          exam.active = false;
        },
        error: (err) => console.error('Failed to deactivate exam', err),
      });
    }
  }

  viewResults(examId: number): void {
    this.router.navigate(['/admin', 'exams', examId, 'results']);
  }
}
