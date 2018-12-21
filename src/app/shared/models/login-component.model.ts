import {
    MatrixLoginFormInputFieldInterface,
    MatrixLoginFormInputFieldErrorsInterface,
    LoginFormInterface
} from './interfaces/login-component.interface';

export class LoginForm implements LoginFormInterface {
    public username: MatrixLoginFormInputFieldInterface = new MatrixLoginFormInputField();
    public password: MatrixLoginFormInputFieldInterface = new MatrixLoginFormInputField();

    public isValidationSuccess(): boolean {
        return this.username.errors.required || this.password.errors.required;
    }

    public validate() {
        this.username.errors.required = (this.username.value && this.username.value.length > 6) ? false : true;
        this.password.errors.required = (this.password.value && this.password.value.length >= 8) ? false : true;
        return this;
    }
}

export class MatrixLoginFormInputField implements MatrixLoginFormInputFieldInterface {
    public value: string;
    public errors: MatrixLoginFormInputFieldErrorsInterface = new MatrixLoginFormInputFieldErrors();
}

export class MatrixLoginFormInputFieldErrors implements MatrixLoginFormInputFieldErrorsInterface {
    public required: boolean = false;
}
