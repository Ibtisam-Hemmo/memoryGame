
type ChoiceGroup<T extends string> = {
    title: string;
    choices: T[];
    selected: T;
    onSelect: (choice: T) => void;
};

export type {
    ChoiceGroup
}