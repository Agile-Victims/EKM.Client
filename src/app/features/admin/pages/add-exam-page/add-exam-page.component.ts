import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamsService } from '../../services/exams.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SubjectService } from '../../../../shared/services/subject.service';

@Component({
  selector: 'app-add-exam-page',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './add-exam-page.component.html',
  styleUrl: './add-exam-page.component.css'
})
export class AddExamPageComponent implements OnInit{
  addExamForm: FormGroup;
  subjectMap: Record<string, string[]> = {
    turkish: ['Türkçe 1', 'Türkçe 2', 'Türkçe 3'],
    math: ['Matematik 1', 'Matematik 2', 'Matematik 3'],
    science: ['Fen 1', 'Fen 2', 'Fen 3'],
    history: ['Tarih 1', 'Tarih 2', 'Tarih 3'],
    religion: ['Din 1', 'Din 2', 'Din 3'],
    foreignLanguage: ['Yabancı Dil 1', 'Yabancı Dil 2', 'Yabancı Dil 3']
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

    this.examSvc.addExam(this.addExamForm.value).subscribe({
      next: () => {
        this.addExamForm.reset();
        this.ngOnInit(); // Formu sıfırla ve yeniden başlat
      },
      error: (err) => console.error('Failed to add exam', err),
    });
  }

  getAllSubjects(){
    /*this.lessons.forEach(lesson => {
      this.subjectService.getSubjects(lesson).subscribe({
        next: (subjects) => {
          switch(lesson){
            case "turkish":
              this.turkishSubjects = subjects;
              break;
            case "math":
              this.mathSubjects = subjects;
              break;
            case "science":
              this.scienceSubjects = subjects;
              break;
            case "history":
              this.historySubjects = subjects;
              break;
            case "religion":
              this.religionSubjects = subjects;
              break;
            case "foreignLanguage":
              this.foreignLanguageSubjects = subjects;
              break;
          }
        },
        error: (err) => console.error(`Failed to get lessons for ${lesson}`, err),
      });
    });
    */

    this.turkishSubjects.push("Türkçe 1");
    this.turkishSubjects.push("Türkçe 2");
    this.turkishSubjects.push("Türkçe 3");
    this.mathSubjects.push("Matematik 1");
    this.mathSubjects.push("Matematik 1");
    this.mathSubjects.push("Matematik 1");
    this.scienceSubjects.push("Fen 1");
    this.scienceSubjects.push("Fen 2");
    this.scienceSubjects.push("Fen 3");
    this.historySubjects.push("Tarih 1");
    this.historySubjects.push("Tarih 2");
    this.historySubjects.push("Tarih 3");
    this.religionSubjects.push("Din 1");
    this.religionSubjects.push("Din 2");
    this.religionSubjects.push("Din 3");
    this.foreignLanguageSubjects.push("Yabacı Dil 1");
    this.foreignLanguageSubjects.push("Yabacı Dil 2");
    this.foreignLanguageSubjects.push("Yabacı Dil 3");
  }
}
