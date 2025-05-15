import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../../../admin/services/exams.service';
import { Exam } from '../../../../shared/models/Exam';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css'],
  imports: [NgFor, RouterLink, NgIf]
})
export class ExamsPageComponent implements OnInit {
  exams: Exam[] = [];
  completedExamIds: number[] = [];

  constructor(
    private examsService: ExamsService, 
    private examService: ExamService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const studentEmail = this.authService.getEmail();
    
    forkJoin({
      exams: this.examsService.getExams(),
      completedExams: this.examService.getCompletedExamsByStudentEmail(studentEmail)
    }).subscribe(result => {
      this.exams = result.exams;
      this.completedExamIds = result.completedExams;
    });
  }

  isExamCompleted(examId: number): boolean {
    return this.completedExamIds.includes(examId);
  }
}
