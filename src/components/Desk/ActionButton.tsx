import { Icon, Wrap } from '../../styles/Desk/ActionButton.style';

interface ActionButtonProps {
    icon: string;
    onClick: (event: React.MouseEvent) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick }) => {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
    };

    return (
        <Wrap>
            <Icon
                src={icon}
                onMouseDown={handleMouseDown}
            />
        </Wrap>
    );
}

export default ActionButton; 