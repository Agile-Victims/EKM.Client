import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService, TeacherProfile } from '../../services/teacher.service';
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

  constructor(private teacherService: TeacherService) {
    this.teacherService.getProfile().pipe(
      tap(response => {
        this.profile = response
        if(this.profile.classes){
          var lessons = this.profile?.classes.split('/');
          if(lessons){
            this.selectedLessons = lessons.filter(lesson => lesson.trim() !== '');
          }
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
    } else {
      this.selectedLessons = this.selectedLessons.filter((l) => l !== lesson);
      this.warningMessage = '';
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
}
