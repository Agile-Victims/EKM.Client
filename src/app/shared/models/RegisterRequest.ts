export class RegisterRequest {
    constructor(
        public nameSurname: string,
        public email: string,
        public password: string
    ) {}
}