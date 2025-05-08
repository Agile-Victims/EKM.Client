export class ExamComplitionForm {
    constructor(
      public examId: number,
      public studentEmail: string,
      public turkishCorrectCount: number,
      public mathCorrectCount: number,
      public scienceCorrectCount: number,
      public historyCorrectCount: number,
      public relegionCorrectCount: number,
      public foreignLanguageCorrectCount: number,
      public turkishWrongCount: number,
      public mathWrongCount: number,
      public scienceWrongCount: number,
      public historyWrongCount: number,
      public relegionWrongCount: number,
      public foreignLanguageWrongCount: number,
    ) {}
}