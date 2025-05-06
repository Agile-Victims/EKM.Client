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
  addExamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private examSvc: ExamsService,
    private router: Router
  ) {
    this.addExamForm = this.fb.group({
      examName: ['', [Validators.required]],
      turkishQuestionCount: [0, [Validators.required, Validators.min(0)]],
      mathQuestionCount: [0, [Validators.required, Validators.min(0)]],
      scienceQuestionCount: [0, [Validators.required, Validators.min(0)]],
      historyQuestionCount: [0, [Validators.required, Validators.min(0)]],
      relegionQuestionCount: [0, [Validators.required, Validators.min(0)]],
      foreignLanguageQuestionCount: [
        0,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

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

  onSubmit(): void {
    if (!this.addExamForm.valid) return;

    this.examSvc.addExam(this.addExamForm.value).subscribe({
      next: (newExam) => {
        this.exams.push(
          new Exam(
            newExam.id,
            newExam.examName,
            newExam.turkishQuestionCount,
            newExam.mathQuestionCount,
            newExam.scienceQuestionCount,
            newExam.historyQuestionCount,
            newExam.relegionQuestionCount,
            newExam.foreignLanguageQuestionCount,
            newExam.active
          )
        );
        this.addExamForm.reset();
      },
      error: (err) => console.error('Failed to add exam', err),
    });
  }

  viewResults(examId: number): void {
    this.router.navigate(['/admin', 'exams', examId, 'results']);
  }
}
