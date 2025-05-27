import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { ExamService } from '../../services/exam.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { SubjectService } from '../../../../shared/services/subject.service';
import { ExamCompletionDTO } from '../../models/ExamCompletionDTO';
import { SubjectWithStats } from '../../../../shared/models/SubjectWithStats';

@Component({
  selector: 'app-exam-complition-page',
  imports: [FormsModule],
  templateUrl: './exam-complition-page.component.html',
  styleUrl: './exam-complition-page.component.css'
})
export class ExamComplitionPageComponent implements OnInit {
   lessons = [
    { key: 'turkish', name: 'Türkçe', total: 0, correct: 0, subjects: [] as SubjectWithStats[] },
    { key: 'math', name: 'Matematik', total: 0, correct: 0, subjects: [] as SubjectWithStats[] },
    { key: 'science', name: 'Fen Bilimleri', total: 0, correct: 0, subjects: [] as SubjectWithStats[] },
    { key: 'history', name: 'Tarih', total: 0, correct: 0, subjects: [] as SubjectWithStats[] },
    { key: 'religion', name: 'Din Kültürü', total: 0, correct: 0, subjects: [] as SubjectWithStats[] },
    { key: 'foreignLanguage', name: 'Yabancı Dil', total: 0, correct: 0, subjects: [] as SubjectWithStats[] }
  ];

  examId!: string;
  examComplitionForm!: ExamCompletionDTO;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    const studentEmail = this.authService.getEmail();

    this.examComplitionForm = new ExamCompletionDTO(
      +this.examId, studentEmail,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      '', '', '', '', '', '',
      '', '', '', '', '', ''
    );

    this.examService.getCompletedExamsByStudentEmail(studentEmail).pipe(
      map(completedExamIds => completedExamIds.includes(+this.examId)),
      tap(isCompleted => {
        if (isCompleted) {
          window.alert('Bu denemeyi daha önce tamamladınız.');
          this.router.navigate(['/student/exams']);
        }
      }),
      switchMap(isCompleted => {
        if (isCompleted) return throwError(() => new Error('Exam already completed'));
        return this.examService.getExamById(this.examId);
      }),
      tap(response => {
        this.lessons[0].total = response.turkishQuestionCount;
        this.lessons[1].total = response.mathQuestionCount;
        this.lessons[2].total = response.scienceQuestionCount;
        this.lessons[3].total = response.historyQuestionCount;
        this.lessons[4].total = response.religionQuestionCount;
        this.lessons[5].total = response.foreignLanguageQuestionCount;

        this.lessons.forEach(lesson => {
          this.subjectService.getSubjects(lesson.key).subscribe(subjects => {
            const subjectMap = this.parseSubjectString(response[`${lesson.key}Subjects`] || '');

            lesson.subjects = subjects.map(subject =>
              new SubjectWithStats(
                subject.id,
                subject.subjectName,
                0, // wrong
                0, // blank
                subjectMap[subject.id] || 0 // questionCount
              )
            );
          });
        });
      }),
      catchError(error => {
        if (error.message !== 'Exam already completed') {
          window.alert('Deneme bulunamadı');
          //this.router.navigate(['/student/exams']);
        }
        return throwError(() => error);
      })
    ).subscribe();
  }

  submitExam() {
    const dto = this.examComplitionForm;

    this.lessons.forEach(lesson => {
      const key = lesson.key;
      const correct = lesson.correct;
      let wrongStr = '';
      let blankStr = '';
      let totalWrong = 0;

      lesson.subjects.forEach(subject => {
        wrongStr += `/${subject.id}-${subject.wrong}`;
        blankStr += `/${subject.id}-${subject.blank}`;
        totalWrong += +subject.wrong;
      });

      switch (key) {
        case 'turkish':
          dto.turkishCorrectCount = correct;
          dto.turkishWrongCount = totalWrong;
          dto.turkishWrongSubjects = wrongStr.slice(1);
          dto.turkishEmptySubjects = blankStr.slice(1);
          break;
        case 'math':
          dto.mathCorrectCount = correct;
          dto.mathWrongCount = totalWrong;
          dto.mathWrongSubjects = wrongStr.slice(1);
          dto.mathEmptySubjects = blankStr.slice(1);
          break;
        case 'science':
          dto.scienceCorrectCount = correct;
          dto.scienceWrongCount = totalWrong;
          dto.scienceWrongSubjects = wrongStr.slice(1);
          dto.scienceEmptySubjects = blankStr.slice(1);
          break;
        case 'history':
          dto.historyCorrectCount = correct;
          dto.historyWrongCount = totalWrong;
          dto.historyWrongSubjects = wrongStr.slice(1);
          dto.historyEmptySubjects = blankStr.slice(1);
          break;
        case 'religion':
          dto.religionCorrectCount = correct;
          dto.religionWrongCount = totalWrong;
          dto.religionWrongSubjects = wrongStr.slice(1);
          dto.religionEmptySubjects = blankStr.slice(1);
          break;
        case 'foreignLanguage':
          dto.foreignLanguageCorrectCount = correct;
          dto.foreignLanguageWrongCount = totalWrong;
          dto.foreignLanguageWrongSubjects = wrongStr.slice(1);
          dto.foreignLanguageEmptySubjects = blankStr.slice(1);
          break;
      }
    });

    this.examService.completeExam(dto).subscribe({
      next: () => {
        window.alert('Deneme tamamlandı');
        this.router.navigate(['/student/exams']);
      },
      error: err => {
        window.alert('Hata oluştu');
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
