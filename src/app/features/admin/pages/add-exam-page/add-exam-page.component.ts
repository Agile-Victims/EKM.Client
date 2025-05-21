import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamsService } from '../../services/exams.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-exam-page',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add-exam-page.component.html',
  styleUrl: './add-exam-page.component.css'
})
export class AddExamPageComponent {
  addExamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private examSvc: ExamsService
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

  onSubmit(): void {
    if (!this.addExamForm.valid) return;

    this.examSvc.addExam(this.addExamForm.value).subscribe({
      next: (newExam) => {
        //mesaj ver
        this.addExamForm.reset();
      },
      error: (err) => console.error('Failed to add exam', err),
    });
  }
}
