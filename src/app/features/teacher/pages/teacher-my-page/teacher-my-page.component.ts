import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService, TeacherProfile } from '../../services/teacher.service';
import { SubjectService } from '../../../../shared/services/subject.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-teacher-my-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-my-page.component.html',
  styleUrls: ['./teacher-my-page.component.css'],
})
export class TeacherMyPageComponent{
  profile: TeacherProfile | null = null;
  warningMessage: string = '';
  successMessage: string = '';

  lessonsList = [
    'Türkçe',
    'Matematik',
    'Fen Bilimleri',
    'T.C. İnkilap Tarihi ve Atatürkçülük',
    'Din Kültürü ve Ahlak Bilgisi',
    'Yabancı Dil',
  ];
  selectedLessons: string[] = [];
  
  // Subject management
  teacherSubjects: { [lesson: string]: string } = {};
  newSubjectInput: { [lesson: string]: string } = {};

  constructor(private teacherService: TeacherService, private subjectService: SubjectService) {
    this.teacherService.getProfile().pipe(
      tap(response => {
        this.profile = response
        if(this.profile.classes){
          var lessons = this.profile?.classes.split('/');
          if(lessons){
            this.selectedLessons = lessons.filter(lesson => lesson.trim() !== '');
            // Initialize subject inputs for selected lessons
            this.selectedLessons.forEach(lesson => {
              this.newSubjectInput[lesson] = '';
            });
          }
        }
        // Load existing subjects if any
        if(this.profile.subjects) {
          this.teacherSubjects = this.profile.subjects;
        }
      }),
      catchError(error => {
        window.alert(`Bilgi getirilemedi`);
        return throwError(() => error);
      })
    ).subscribe();
  }

  isSelected(lesson: string): boolean {
    return this.selectedLessons.includes(lesson);
  }

  onCheckboxChange(e: Event, lesson: string) {
    const checked = (e.target as HTMLInputElement).checked;
    
    if (checked) {
      // If a lesson is already selected, show warning
      if (this.selectedLessons.length > 0) {
        this.warningMessage = 'Sadece bir ders seçebilirsiniz. Mevcut ders değiştirilecektir.';
        // Uncheck the current selection
        this.selectedLessons = [];
      } else {
        this.warningMessage = '';
      }
      this.selectedLessons = [lesson];
      // Initialize subject input for the new lesson
      this.newSubjectInput[lesson] = '';
    } else {
      this.selectedLessons = this.selectedLessons.filter((l) => l !== lesson);
      this.warningMessage = '';
      // Remove subject input for unselected lesson
      delete this.newSubjectInput[lesson];
    }
  }

  save() {
    const classes = this.selectedLessons.join('/');
    this.teacherService.updateMyLessons(classes).pipe(
      tap(response => {
        if (response.success) {
          this.successMessage = 'Ders seçiminiz kaydedildi.';
          this.warningMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      }),
      catchError(error => {
        window.alert(`Ders seçiminiz kaydedilemedi`);
        return throwError(() => error);
      })
    ).subscribe();
  }

  addSubject(lesson: string) {
    this.subjectService.addSubject(lesson, this.newSubjectInput[lesson]?.trim()).pipe(
      tap(response => {
        if (response.success) {
          this.successMessage = 'Konular kaydedildi.';
          this.warningMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      }),
      catchError(error => {
        window.alert(`Konular kaydedilemedi`);
        return throwError(() => error);
      })
    ).subscribe();




    const subjectInput = this.newSubjectInput[lesson]?.trim();
    if (!subjectInput) {
      this.warningMessage = 'Lütfen konu adını girin.';
      setTimeout(() => {
        this.warningMessage = '';
      }, 3000);
      return;
    }

    // Check if lesson is in selected lessons
    if (!this.selectedLessons.includes(lesson)) {
      this.warningMessage = 'Sadece verdiğiniz derslere konu ekleyebilirsiniz.';
      setTimeout(() => {
        this.warningMessage = '';
      }, 3000);
      return;
    }

    // Update local subjects
    if (!this.teacherSubjects[lesson]) {
      this.teacherSubjects[lesson] = subjectInput;
    } else {
      this.teacherSubjects[lesson] += '/' + subjectInput;
    }

    // Clear input
    this.newSubjectInput[lesson] = '';

    // Save to backend
    this.saveSubjects();
  }

  removeSubject(lesson: string, subjectToRemove: string) {
    if (this.teacherSubjects[lesson]) {
      const subjects = this.teacherSubjects[lesson].split('/');
      this.teacherSubjects[lesson] = subjects
        .filter(subject => subject !== subjectToRemove)
        .join('/');
      
      if (this.teacherSubjects[lesson] === '') {
        delete this.teacherSubjects[lesson];
      }
      
      this.saveSubjects();
    }
  }

  getSubjectsForLesson(lesson: string): string[] {
    if (!this.teacherSubjects[lesson]) {
      return [];
    }
    return this.teacherSubjects[lesson].split('/').filter(subject => subject.trim() !== '');
  }

  saveSubjects() {
    
  }
}
