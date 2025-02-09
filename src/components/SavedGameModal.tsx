import ConfirmationModal from './ConfirmationModal';

const SavedGameModal: React.FC<{ handleContinue: () => void; handleNewGame: () => void }> = ({ handleContinue, handleNewGame }) => {
    return (
        <ConfirmationModal
            message="You still have a saved game. Do you want to continue playing it or start a new one?"
            confirmText="Continue"
            cancelText="Start New Game"
            onConfirm={handleContinue}
            onCancel={handleNewGame}
        />
    );
};

export default SavedGameModal;
