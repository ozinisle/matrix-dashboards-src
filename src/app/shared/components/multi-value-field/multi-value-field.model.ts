import {
    MultiValueFieldComponentOutputModelInterface,
    MultiValueFieldComponentInputModelInterface
} from './multi-value-field.interface';

export class MultiValueFieldComponentInputModel implements MultiValueFieldComponentInputModelInterface {
    public multiValueArrayList: string[] = [];
    titleText: string = '';
    public noPrefix: boolean = false;
}

export class MultiValueFieldComponentOutputModel implements MultiValueFieldComponentOutputModelInterface {
    public multiValueArrayList: string[] = [];
}
