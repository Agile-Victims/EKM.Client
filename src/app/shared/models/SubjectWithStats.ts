export class SubjectWithStats {
    constructor(
      public id: number,
      public name: string,
      public wrong: number,
      public blank: number,
      public questionCount: number
    ) {}
}