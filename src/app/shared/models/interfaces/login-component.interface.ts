
export interface LoginComponentInterface {
    onSubmit();
}

export interface LoginFormInterface {
    username: MatrixLoginFormInputFieldInterface;
    password: MatrixLoginFormInputFieldInterface;

    isValidationSuccess(): boolean;

    validate(): LoginFormInterface;
}

export interface MatrixLoginFormInputFieldErrorsInterface {
    required: boolean;
}

export interface MatrixLoginFormInputFieldInterface {
    value: string;
    errors: MatrixLoginFormInputFieldErrorsInterface;
}


