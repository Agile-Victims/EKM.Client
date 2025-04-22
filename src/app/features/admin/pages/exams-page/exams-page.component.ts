import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Exam } from '../../../../shared/models/Exam';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-exams-page',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './exams-page.component.html',
  styleUrl: './exams-page.component.css'
})
export class ExamsPageComponent {
  exams: Exam[] = [
    new Exam(1, 'TYT 2025', 40, 40, 20, 15, 10, 5, true),
    new Exam(2, 'AYT 2025', 0, 50, 50, 30, 0, 0, false),
    new Exam(3, 'LGS Deneme 1', 20, 20, 20, 10, 5, 10, true),
    new Exam(4, 'KPSS Genel Yetenek', 30, 30, 0, 25, 10, 5, false)
  ];
  addExamForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addExamForm = this.fb.group({
      examName: ['', [Validators.required]],
      turkishQuestionCount: ['', [Validators.required]],
      mathQuestionCount: ['', [Validators.required]],
      scienceQuestionCount: ['', [Validators.required]],
      historyQuestionCount: ['', [Validators.required]],
      relegionQuestionCount: ['', [Validators.required]],
      foreignLanguageQuestionCount: ['', [Validators.required]],
    });
  }

  onClose(id: number) {
    const exam = this.exams.find(e => e.id === id);
    if (exam) {
      exam.isActive = false;
      console.log(`Close clicked for exam with ID: ${id}`);
    }
  }

  onSubmit(){
    if(this.addExamForm.valid){
      console.log(this.addExamForm.value)
    }
  }
}
