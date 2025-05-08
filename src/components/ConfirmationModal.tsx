import styles from '../styles/modal.module.scss';
import { ModalProps } from '../types/componentType';



const ConfirmationModal: React.FC<ModalProps> = ({ message, confirmText, cancelText, onConfirm, onCancel }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <button onClick={onCancel} className={styles.cancelBtn}>{cancelText}</button>
                <button onClick={onConfirm} className={styles.actionBtn}>{confirmText}</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
