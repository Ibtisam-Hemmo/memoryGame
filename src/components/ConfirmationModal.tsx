import styles from '../styles/modal.module.scss';

type Props = {
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({ message, confirmText, cancelText, onConfirm, onCancel }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <button onClick={onCancel}>{cancelText}</button>
                <button onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
