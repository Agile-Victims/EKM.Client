export class ExamResult {
    constructor(
      public studentId: number,
      public studentName: string,
      public studentSurname: string,
      public studentEmail: string,
      public turkishNet: number,
      public mathNet: number,
      public scienceNet: number,
      public historyNet: number,
      public religionNet: number,
      public foreignLanguageNet: number
    ) {}
  }
  