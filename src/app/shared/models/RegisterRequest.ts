export class RegisterRequest {
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public password: string
    ) {}
}