import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  subjectMap: Record<string, { subjectName: string; id: number }[]> = {
    turkish: [],
    math: [],
    science: [],
    history: [],
    religion: [],
    foreignLanguage: []
  };

  lessons: string[] = ["turkish", "math", "science", "history", "religion", "foreignLanguage"];
  turkishSubjects: string[] = [];
  mathSubjects: string[] = [];
  scienceSubjects: string[] = [];
  historySubjects: string[] = [];
  religionSubjects: string[] = [];
  foreignLanguageSubjects: string[] = [];

  constructor(private fb: FormBuilder, private examSvc: ExamsService, private subjectService: SubjectService,  private cdr: ChangeDetectorRef) {
    this.addExamForm = this.fb.group({
      examTitle: ['', Validators.required],
      turkish: this.fb.array([this.createQuestionGroup()]),
      math: this.fb.array([this.createQuestionGroup()]),
      science: this.fb.array([this.createQuestionGroup()]),
      history: this.fb.array([this.createQuestionGroup()]),
      religion: this.fb.array([this.createQuestionGroup()]),
      foreignLanguage: this.fb.array([this.createQuestionGroup()])
    });
  }

  ngOnInit(): void {
    this.lessons.forEach(lesson => {
      this.subjectService.getSubjects(lesson).subscribe({
        next: (subjects) => {
          this.subjectMap[lesson] = [];
          this.subjectMap[lesson] = subjects;
          this.cdr.detectChanges();
          const formArray = this.getLessonArray(lesson);
          if (subjects.length > 0 && formArray.length > 0) {
            formArray.at(0).get('subject')?.setValue(subjects[0].id.toString());
          }
        },
        error: (err) => console.error(`Failed to get subjects for ${lesson}`, err),
      });
    });
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

    Object.keys(this.addExamForm.value).forEach(lesson => {
      var totalQuestionCount: number = 0;
      const subjects = this.addExamForm.value[lesson] ?? [];
      const subjectArray = Array.isArray(subjects) ? subjects : [subjects];

      subjectArray.forEach((subject: any) => {
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

    this.addExamRequest.examName = this.addExamForm.get('examTitle')?.value;

    this.examSvc.addExam(this.addExamRequest).subscribe({
      next: () => {
        this.addExamForm.reset();
        this.ngOnInit();
      },
      error: (err) => console.error('Failed to add exam', err),
    });
  }

  translateLesson(lesson: string){
    var translation = "";
    switch(lesson){
      case "turkish":
        translation = "Türkçe";
        break;
      case "math":
        translation = "Matematik"; 
        break;
      case "science":
        translation = "Fen Bilimleri";
        break;
      case "history":
        translation = "T.C. İnkilap Tarihi ve Atatürkçülük";
        break;
      case "religion":
        translation = "Din Kültürü ve Ahlak Bilgisi";
        break;
      case "foreignLanguage":
        translation = "Yabancı Dil";
        break;
    }

    return translation;
  }
}
