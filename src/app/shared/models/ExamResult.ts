export class ExamResult {
    constructor(
      public studentId: number,
      public studentName: string,
      public studentSurname: string,
      public studentEmail: string,
      public net: number,
      public completed: boolean
    ) {}
  }
  