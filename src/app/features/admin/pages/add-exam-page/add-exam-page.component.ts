import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamsService } from '../../services/exams.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SubjectService } from '../../../../shared/services/subject.service';
import { AddExamRequest } from '../../../../shared/models/AddExamRequest';

@Component({
  selector: 'app-add-exam-page',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './add-exam-page.component.html',
  styleUrl: './add-exam-page.component.css'
})
export class AddExamPageComponent implements OnInit{
  addExamRequest: AddExamRequest = new AddExamRequest(
    '', 0, 0, 0, 0, 0, 0,
    '', '', '', '', '', '', 
  );
  addExamForm: FormGroup;
  subjectMap: Record<string, { subject: string; id: number }[]> = {
    turkish: [
      { subject: 'Türkçe 1', id: 1 },
      { subject: 'Türkçe 2', id: 2 },
      { subject: 'Türkçe 3', id: 3 }
    ],
    math: [
      { subject: 'Matematik 1', id: 4 },
      { subject: 'Matematik 2', id: 5 },
      { subject: 'Matematik 3', id: 6 }
    ],
    science: [
      { subject: 'Fen 1', id: 7 },
      { subject: 'Fen 2', id: 8 },
      { subject: 'Fen 3', id: 9 }
    ],
    history: [
      { subject: 'Tarih 1', id: 10 },
      { subject: 'Tarih 2', id: 11 },
      { subject: 'Tarih 3', id: 12 }
    ],
    religion: [
      { subject: 'Din 1', id: 13 },
      { subject: 'Din 2', id: 14 },
      { subject: 'Din 3', id: 15 }
    ],
    foreignLanguage: [
      { subject: 'Yabancı Dil 1', id: 16 },
      { subject: 'Yabancı Dil 2', id: 17 },
      { subject: 'Yabancı Dil 3', id: 18 }
    ]
  };

  lessons: string[] = ["turkish", "math", "science", "history", "religion", "foreignLanguage"];
  turkishSubjects: string[] = [];
  mathSubjects: string[] = [];
  scienceSubjects: string[] = [];
  historySubjects: string[] = [];
  religionSubjects: string[] = [];
  foreignLanguageSubjects: string[] = [];

  constructor(private fb: FormBuilder, private examSvc: ExamsService, private subjectService: SubjectService) {
    this.addExamForm = this.fb.group({
      turkish: this.fb.array([this.createQuestionGroup()]),
      math: this.fb.array([this.createQuestionGroup()]),
      science: this.fb.array([this.createQuestionGroup()]),
      history: this.fb.array([this.createQuestionGroup()]),
      religion: this.fb.array([this.createQuestionGroup()]),
      foreignLanguage: this.fb.array([this.createQuestionGroup()])
    });
  }

  ngOnInit(): void {
    this.getAllSubjects();
  }

  createQuestionGroup(): FormGroup {
    return this.fb.group({
      subject: ['', Validators.required],
      questionCount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  getLessonArray(lesson: string): FormArray {
    return this.addExamForm.get(lesson) as FormArray;
  }

  addQuestion(lesson: string): void {
    this.getLessonArray(lesson).push(this.createQuestionGroup());
  }

  removeQuestion(lesson: string, index: number): void {
    const arr = this.getLessonArray(lesson);
    if (arr.length > 1) {
      arr.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.addExamForm.invalid) {
      alert("Tüm derslerde en az bir geçerli konu ve pozitif soru sayısı olmalı.");
      return;
    }

    console.log(this.addExamForm.value)

    Object.keys(this.addExamForm.value).forEach(lesson => {
      var totalQuestionCount: number = 0;
      const subjects = this.addExamForm.value[lesson];

      subjects.forEach((subject: any) => {
        totalQuestionCount += subject.questionCount;
        switch(lesson){
          case "turkish":
            this.addExamRequest.turkishSubjects += `/${subject.subject}-${subject.questionCount}`;
            break;
          case "math":
            this.addExamRequest.mathSubjects += `/${subject.subject}-${subject.questionCount}`;
            break;
          case "science":
            this.addExamRequest.scienceSubjects += `/${subject.subject}-${subject.questionCount}`;
            break;
          case "history":
            this.addExamRequest.historySubjects += `/${subject.subject}-${subject.questionCount}`;
            break;
          case "religion":
            this.addExamRequest.religionSubjects += `/${subject.subject}-${subject.questionCount}`;
            break;
          case "foreignLanguage":
            this.addExamRequest.foreignLanguageSubjects += `/${subject.subject}-${subject.questionCount}`;
            break;
        }
      });

      switch(lesson){
          case "turkish":
            this.addExamRequest.turkishQuestionCount = totalQuestionCount;
            this.addExamRequest.turkishSubjects = this.addExamRequest.turkishSubjects .slice(1); 
            break;
          case "math":
            this.addExamRequest.mathQuestionCount = totalQuestionCount;
            this.addExamRequest.mathSubjects = this.addExamRequest.mathSubjects .slice(1); 
            break;
          case "science":
            this.addExamRequest.scienceQuestionCount = totalQuestionCount;
            this.addExamRequest.scienceSubjects = this.addExamRequest.scienceSubjects .slice(1); 
            break;
          case "history":
            this.addExamRequest.historyQuestionCount = totalQuestionCount;
            this.addExamRequest.historySubjects = this.addExamRequest.historySubjects .slice(1); 
            break;
          case "religion":
            this.addExamRequest.religionQuestionCount = totalQuestionCount;
            this.addExamRequest.religionSubjects = this.addExamRequest.religionSubjects .slice(1); 
            break;
          case "foreignLanguage":
            this.addExamRequest.foreignLanguageQuestionCount = totalQuestionCount;
            this.addExamRequest.foreignLanguageSubjects = this.addExamRequest.foreignLanguageSubjects .slice(1); 
            break;
        }
    });

    console.log(this.addExamRequest);

    this.examSvc.addExam(this.addExamForm.value).subscribe({
      next: () => {
        this.addExamForm.reset();
        this.ngOnInit(); // Formu sıfırla ve yeniden başlat
      },
      error: (err) => console.error('Failed to add exam', err),
    });
  }

  getAllSubjects() {
  this.lessons.forEach(lesson => {
    this.subjectService.getSubjects(lesson).subscribe({
      next: (subjects) => {
        this.subjectMap[lesson] = []; // önce temizle
        this.subjectMap[lesson] = subjects; // sonra yeni gelenleri ata
      },
      error: (err) => console.error(`Failed to get subjects for ${lesson}`, err),
    });
  });
}
}
