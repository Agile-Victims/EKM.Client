export class AddExamRequest {
    constructor(
      public examName: string,
      public turkishQuestionCount: number,
      public mathQuestionCount: number,
      public scienceQuestionCount: number,
      public historyQuestionCount: number,
      public religionQuestionCount: number,
      public foreignLanguageQuestionCount: number,
      public turkishSubjects: string,
      public mathSubjects: string,
      public scienceSubjects: string,
      public historySubjects: string,
      public religionSubjects: string,
      public foreignLanguageSubjects: string
    ) {}
}