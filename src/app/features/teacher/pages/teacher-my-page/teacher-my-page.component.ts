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
        var lessons = this.profile?.classes.split('/');
        if(lessons){
          this.selectedLessons = lessons;
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
      this.selectedLessons.push(lesson);
    } else {
      this.selectedLessons = this.selectedLessons.filter((l) => l !== lesson);
    }
  }

  save() {
    const classes = this.selectedLessons.join('/');
    this.teacherService
      .updateMyLessons(classes)
      .subscribe((res) => {
        if (res.success) {
          alert('Ders seçiminiz kaydedildi.');
        }
      });
  }
}
