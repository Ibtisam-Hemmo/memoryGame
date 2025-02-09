import ConfirmationModal from './ConfirmationModal';

const RestartModal: React.FC<{ cancel: () => void; restart: () => void }> = ({ cancel, restart }) => {
    return (
        <ConfirmationModal
            message="Are you sure you want to restart this game?"
            confirmText="Restart"
            cancelText="Cancel"
            onConfirm={restart}
            onCancel={cancel}
        />
    );
};

export default RestartModal;
