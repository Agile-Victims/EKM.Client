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
              // Load subjects for each selected lesson
              this.loadSubjectsForLesson(lesson);
            });
          }
        }
        // Remove the local subjects loading since we're getting from backend
      }),
      catchError(error => {
        window.alert(`Bilgi getirilemedi`);
        return throwError(() => error);
      })
    ).subscribe();
  }

  loadSubjectsForLesson(lesson: string) {
    // Convert lesson name to backend format
    const lessonKey = this.getLessonKey(lesson);
    this.subjectService.getSubjects(lessonKey).pipe(
      tap(subjects => {
        // Convert backend subjects to our format
        const subjectNames = subjects.map(s => s.subjectName).join('/');
        if (subjectNames) {
          this.teacherSubjects[lesson] = subjectNames;
        }
      }),
      catchError(error => {
        console.error(`Failed to load subjects for ${lesson}`, error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getLessonKey(lessonName: string): string {
    // Convert Turkish lesson names to backend keys
    const lessonMap: { [key: string]: string } = {
      'Türkçe': 'turkish',
      'Matematik': 'math',
      'Fen Bilimleri': 'science',
      'T.C. İnkilap Tarihi ve Atatürkçülük': 'history',
      'Din Kültürü ve Ahlak Bilgisi': 'religion',
      'Yabancı Dil': 'foreignLanguage'
    };
    return lessonMap[lessonName] || lessonName.toLowerCase();
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
      // Load subjects for the newly selected lesson
      this.loadSubjectsForLesson(lesson);
    } else {
      this.selectedLessons = this.selectedLessons.filter((l) => l !== lesson);
      this.warningMessage = '';
      // Remove subject input and subjects for unselected lesson
      delete this.newSubjectInput[lesson];
      delete this.teacherSubjects[lesson];
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

    // Convert lesson name to backend format
    const lessonKey = this.getLessonKey(lesson);
    
    // Send to backend immediately
    this.subjectService.addSubject(lessonKey, subjectInput).pipe(
      tap(response => {
        if (response.success) {
          // Update local subjects
          if (!this.teacherSubjects[lesson]) {
            this.teacherSubjects[lesson] = subjectInput;
          } else {
            this.teacherSubjects[lesson] += '/' + subjectInput;
          }
          
          // Clear input
          this.newSubjectInput[lesson] = '';
          
          this.successMessage = 'Konu eklendi.';
          this.warningMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      }),
      catchError(error => {
        window.alert(`Konu eklenemedi`);
        return throwError(() => error);
      })
    ).subscribe();
  }

  removeSubject(lesson: string, subjectToRemove: string) {
    // Convert lesson name to backend format
    const lessonKey = this.getLessonKey(lesson);
    
    // Send delete request to backend
    this.subjectService.deleteSubject(lessonKey, subjectToRemove).pipe(
      tap(response => {
        if (response.success) {
          // Update local subjects
          if (this.teacherSubjects[lesson]) {
            const subjects = this.teacherSubjects[lesson].split('/');
            this.teacherSubjects[lesson] = subjects
              .filter(subject => subject !== subjectToRemove)
              .join('/');
            
            if (this.teacherSubjects[lesson] === '') {
              delete this.teacherSubjects[lesson];
            }
          }
          
          this.successMessage = 'Konu silindi.';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      }),
      catchError(error => {
        window.alert(`Konu silinemedi`);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getSubjectsForLesson(lesson: string): string[] {
    if (!this.teacherSubjects[lesson]) {
      return [];
    }
    return this.teacherSubjects[lesson].split('/').filter(subject => subject.trim() !== '');
  }

  saveSubjects() {
    // This method is no longer needed since we save one at a time
  }
}
