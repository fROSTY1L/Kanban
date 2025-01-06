import { Icon, DeleteZone } from '../../styles/Desk/DeleteButton.style';
import icon from '../../assets/Desk/trash.png';
import { useDroppable } from '@dnd-kit/core';

interface DeleteButtonProps {
    onDeleteAll?: () => void;
}

const DeleteButton = ({ onDeleteAll }: DeleteButtonProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'delete-zone'
    });

    return (
        <DeleteZone ref={setNodeRef} $isOver={isOver}>
            <Icon
                src={icon}
                onClick={onDeleteAll}
            />
        </DeleteZone>
    );
};

export default DeleteButton;
