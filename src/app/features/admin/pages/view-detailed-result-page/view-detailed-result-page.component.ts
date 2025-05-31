import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { SubjectService } from '../../../../shared/services/subject.service';
import { catchError, tap, throwError } from 'rxjs';
import { ExamCompletionDTO } from '../../../student/models/ExamCompletionDTO';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-detailed-result-page',
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './view-detailed-result-page.component.html',
  styleUrl: './view-detailed-result-page.component.css'
})
export class ViewDetailedResultPageComponent {
  examId!: number;
  studentId!: number;
  subjects: {subjectName: string, id:number}[] = [];
  examCompletion: ExamCompletionDTO = new ExamCompletionDTO(0,'',0,0,0,0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','');
  turkishSubjects: { subject: string; wrongCount: number; emptyCount: number }[] = [];
  mathSubjects: { subject: string; wrongCount: number; emptyCount: number }[] = [];
  scienceSubjects: { subject: string; wrongCount: number; emptyCount: number }[] = [];
  historySubjects: { subject: string; wrongCount: number; emptyCount: number }[] = [];
  religionSubjects: { subject: string; wrongCount: number; emptyCount: number }[] = [];
  foreignLanguageSubjects: { subject: string; wrongCount: number; emptyCount: number }[] = [];


  constructor(private route: ActivatedRoute, private examService: ExamsService, private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.studentId = +this.route.snapshot.paramMap.get('studentId')!;

    this.examService.getDetailedResults(this.examId, this.studentId).pipe(
      tap(response => {
        console.log(response)
        this.examCompletion = response;
        this.subjectService.getAllSubjects().pipe(
          tap(subjects => {
            console.log(subjects)
            this.subjects = subjects
            this.handleSubjects();
            console.log(this.turkishSubjects)
            console.log(this.mathSubjects)
            console.log(this.scienceSubjects)
            console.log(this.religionSubjects)
            console.log(this.foreignLanguageSubjects)
            console.log(this.historySubjects)
          }),
          catchError(err => {
            return throwError(() => err);
          })
        ).subscribe();
      }),
      catchError(error => {
        return throwError(() => error);
      })
    ).subscribe();
  }

  handleSubjects(){
    var wrongSubjects: string[] = this.examCompletion.turkishWrongSubjects.split('/');
    var emptySubjects: string[] = this.examCompletion.turkishEmptySubjects.split('/');
    var n: number = wrongSubjects.length;
    var i;
    for(i = 0; i < n; i++){
      this.turkishSubjects.push({
        subject: this.getSubjectName(wrongSubjects[i].split('-')[0]),
        wrongCount: +wrongSubjects[i].split('-')[1],
        emptyCount: +emptySubjects[i].split('-')[1]
      });
    }

    wrongSubjects = this.examCompletion.mathWrongSubjects.split('/');
    emptySubjects = this.examCompletion.mathEmptySubjects.split('/');
    n = wrongSubjects.length;
    for(i = 0; i < n; i++){
      this.mathSubjects.push({
        subject: this.getSubjectName(wrongSubjects[i].split('-')[0]),
        wrongCount: +wrongSubjects[i].split('-')[1],
        emptyCount: +emptySubjects[i].split('-')[1]
      });
    }

    wrongSubjects = this.examCompletion.scienceWrongSubjects.split('/');
    emptySubjects = this.examCompletion.scienceEmptySubjects.split('/');
    n = wrongSubjects.length;
    for(i = 0; i < n; i++){
      this.scienceSubjects.push({
        subject: this.getSubjectName(wrongSubjects[i].split('-')[0]),
        wrongCount: +wrongSubjects[i].split('-')[1],
        emptyCount: +emptySubjects[i].split('-')[1]
      });
    }

    wrongSubjects = this.examCompletion.historyWrongSubjects.split('/');
    emptySubjects = this.examCompletion.historyEmptySubjects.split('/');
    n = wrongSubjects.length;
    for(i = 0; i < n; i++){
      this.historySubjects.push({
        subject: this.getSubjectName(wrongSubjects[i].split('-')[0]),
        wrongCount: +wrongSubjects[i].split('-')[1],
        emptyCount: +emptySubjects[i].split('-')[1]
      });
    }

    wrongSubjects = this.examCompletion.religionWrongSubjects.split('/');
    emptySubjects = this.examCompletion.religionEmptySubjects.split('/');
    n = wrongSubjects.length;
    for(i = 0; i < n; i++){
      this.religionSubjects.push({
        subject: this.getSubjectName(wrongSubjects[i].split('-')[0]),
        wrongCount: +wrongSubjects[i].split('-')[1],
        emptyCount: +emptySubjects[i].split('-')[1]
      });
    }

    wrongSubjects = this.examCompletion.foreignLanguageWrongSubjects.split('/');
    emptySubjects = this.examCompletion.foreignLanguageEmptySubjects.split('/');
    n = wrongSubjects.length;
    for(i = 0; i < n; i++){
      this.foreignLanguageSubjects.push({
        subject: this.getSubjectName(wrongSubjects[i].split('-')[0]),
        wrongCount: +wrongSubjects[i].split('-')[1],
        emptyCount: +emptySubjects[i].split('-')[1]
      });
    }
  }

  getSubjectName(id: string): string {
    const subject = this.subjects.find(s => s.id === +id);
    return subject ? subject.subjectName : 'Bilinmeyen Konu';
  }
}
