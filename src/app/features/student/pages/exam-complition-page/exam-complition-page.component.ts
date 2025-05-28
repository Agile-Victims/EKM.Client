import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { ExamService } from '../../services/exam.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { SubjectService } from '../../../../shared/services/subject.service';
import { ExamCompletionDTO } from '../../models/ExamCompletionDTO';
import { SubjectWithStats } from '../../../../shared/models/SubjectWithStats';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-exam-complition-page',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './exam-complition-page.component.html',
  styleUrl: './exam-complition-page.component.css'
})
export class ExamComplitionPageComponent implements OnInit {
  examId: number = 0;
  examForm!: FormGroup;
  lessonKeys = ['turkish', 'math', 'science', 'history', 'religion', 'foreignLanguage'];
  lessonNames: Record<string, string> = {
    turkish: 'Türkçe',
    math: 'Matematik',
    science: 'Fen Bilimleri',
    history: 'Tarih',
    religion: 'Din Kültürü',
    foreignLanguage: 'Yabancı Dil'
  };
  subjectMap: Record<string, { id: number; subjectName: string; }[]> = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private authService: AuthService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
      if (idParam) {
        this.examId = +idParam; // string -> number dönüşümü
      }
    });

    this.examForm = this.fb.group({});
    this.lessonKeys.forEach(key => {
    this.examForm.addControl(key, this.fb.array([]));
    this.examForm.addControl(key + 'Stats', this.fb.group({
      correct: [0, [Validators.required, Validators.min(0)]],
      wrong: [0, [Validators.required, Validators.min(0)]]
    }));

    this.subjectService.getSubjects(key).subscribe(subjects => {
      this.subjectMap[key] = subjects;
    });
  });
  }

  getLessonArray(lessonKey: string): FormArray {
    return this.examForm.get(lessonKey) as FormArray;
  }

  getStatsGroup(lesson: string): FormGroup {
    return this.examForm.get(lesson + 'Stats') as FormGroup;
  }

  addSubject(lessonKey: string): void {
    const control = this.getLessonArray(lessonKey);
    control.push(this.fb.group({
      subjectId: ['', Validators.required],
      wrongCount: [0, [Validators.required, Validators.min(0)]],
      emptyCount: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeSubject(lessonKey: string, index: number): void {
    this.getLessonArray(lessonKey).removeAt(index);
  }

  submitExam() {
    const formData = this.examForm.value;
    const examId = this.examId;
    const studentEmail = this.authService.getEmail();

    function buildSubjectString(subjects: any[], countField: 'wrongCount' | 'emptyCount'): string {
      if (!subjects || subjects.length === 0) return '';
      return subjects
        .map(s => `${s.subjectId}-${s[countField] || 0}`)
        .join('/');
    }
    const dto = new ExamCompletionDTO(
      examId,
      studentEmail,
      formData.turkishStats.correct,
      formData.mathStats.correct,
      formData.scienceStats.correct,
      formData.historyStats.correct,
      formData.religionStats.correct,
      formData.foreignLanguageStats.correct,

      formData.turkishStats.wrong,
      formData.mathStats.wrong,
      formData.scienceStats.wrong,
      formData.historyStats.wrong,
      formData.religionStats.wrong,
      formData.foreignLanguageStats.wrong,

      buildSubjectString(formData.turkish, 'wrongCount'),
      buildSubjectString(formData.math, 'wrongCount'),
      buildSubjectString(formData.science, 'wrongCount'),
      buildSubjectString(formData.history, 'wrongCount'),
      buildSubjectString(formData.religion, 'wrongCount'),
      buildSubjectString(formData.foreignLanguage, 'wrongCount'),

      buildSubjectString(formData.turkish, 'emptyCount'),
      buildSubjectString(formData.math, 'emptyCount'),
      buildSubjectString(formData.science, 'emptyCount'),
      buildSubjectString(formData.history, 'emptyCount'),
      buildSubjectString(formData.religion, 'emptyCount'),
      buildSubjectString(formData.foreignLanguage, 'emptyCount'),
    );

    console.log(dto);

    this.examService.completeExam(dto).subscribe({
      next: () => {
        alert('Deneme başarıyla tamamlandı.');
        this.router.navigate(['/student/exams']);
      },
      error: err => {
        alert('Bir hata oluştu.');
        console.error(err);
      }
    });
  }


  parseSubjectString(subjectStr: string): Record<number, number> {
    return subjectStr.split('/').reduce((acc, part) => {
      const [id, count] = part.split('-').map(Number);
      if (!isNaN(id) && !isNaN(count)) {
        acc[id] = count;
      }
      return acc;
    }, {} as Record<number, number>);
  }

}
