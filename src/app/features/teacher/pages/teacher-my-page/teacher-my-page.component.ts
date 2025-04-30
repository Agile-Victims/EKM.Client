import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService, TeacherProfile } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-my-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-my-page.component.html',
  styleUrls: ['./teacher-my-page.component.css'],
})
export class TeacherMyPageComponent implements OnInit {
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

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getProfile().subscribe((p) => (this.profile = p));
    this.teacherService
      .getMyLessons()
      .subscribe((ls) => (this.selectedLessons = ls));
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
    this.teacherService
      .updateMyLessons(this.selectedLessons)
      .subscribe((res) => {
        if (res.success) {
          alert('Ders seçiminiz kaydedildi.');
        }
      });
  }
}
