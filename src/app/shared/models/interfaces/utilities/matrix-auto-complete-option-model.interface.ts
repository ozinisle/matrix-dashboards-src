export interface MatrixAutoCompleteGroupOptionInterface<T> {
    getGroupTitle(): string;
    setGroupTitle(groupTitle: string): MatrixAutoCompleteGroupOptionInterface<T>;

    getOptions(): MatrixAutoCompleteOptionInterface<T>[];
    setOptions(options: MatrixAutoCompleteOptionInterface<T>[]): MatrixAutoCompleteGroupOptionInterface<T>;
}

export interface MatrixAutoCompleteOptionInterface<T> {
    getLabel(): string;
    setLabel(label: string): MatrixAutoCompleteOptionInterface<T>;

    getValue(): T;
    setValue(value: T): MatrixAutoCompleteOptionInterface<T>;
}
