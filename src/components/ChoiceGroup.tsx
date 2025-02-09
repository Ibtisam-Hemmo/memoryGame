import styles from '../styles/settings.module.scss';
import { ChoiceGroup as ChoiceGroupType } from '../types/componentType';

const ChoiceGroup = <T extends string>({
    title,
    choices,
    selected,
    onSelect }: ChoiceGroupType<T>) => (

    <div className={styles.choiceContainer}>
        <span className={styles.mainChoice}>{title}</span>
        <div className={styles.choicesGroup}>
            {choices.map((choice) => (
                <span
                    key={choice}
                    className={`${styles.choice} ${selected === choice ? styles.active : ""}`}
                    onClick={() => onSelect(choice)}
                >
                    {choice}
                </span>
            ))}
        </div>
    </div>
);

export default ChoiceGroup;
