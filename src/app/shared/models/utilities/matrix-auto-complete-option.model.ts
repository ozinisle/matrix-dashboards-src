import {
    MatrixAutoCompleteGroupOptionInterface
} from '../interfaces/utilities/matrix-auto-complete-option-model.interface';

export class MatrixAutoCompleteGroupOption<T> implements MatrixAutoCompleteGroupOptionInterface<T> {
    private groupTitle: string;
    private options: MatrixAutoCompleteOption<T>[] = [];

    public getGroupTitle(): string {
        return this.groupTitle;
    }

    public setGroupTitle(groupTitle: string): MatrixAutoCompleteGroupOption<T> {
        this.groupTitle = groupTitle;
        return this;
    }

    public getOptions(): MatrixAutoCompleteOption<T>[] {
        return this.options;
    }

    public setOptions(options: MatrixAutoCompleteOption<T>[]): MatrixAutoCompleteGroupOption<T> {
        this.options = options;
        return this;
    }
}

export class MatrixAutoCompleteOption<T> implements MatrixAutoCompleteOption<T> {
    private label: string;
    private value: T;

    public getLabel(): string {
        return this.label;
    }

    public setLabel(label: string): MatrixAutoCompleteOption<T> {
        this.label = label;
        return this;
    }

    public getValue(): T {
        return this.value;
    }

    public setValue(value: T): MatrixAutoCompleteOption<T> {
        this.value = value;
        return this;
    }
}
