
type ChoiceGroup<T extends string> = {
    title: string;
    choices: T[];
    selected: T;
    onSelect: (choice: T) => void;
};

type ModalProps = {
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export type {
    ChoiceGroup,
    ModalProps
}