import { useState } from 'react';
import { Icon, Wrap } from '../../styles/Desk/EditButton.style';
import icon from '../../assets/Desk/edit.png';
import hoveredIcon from '../../assets/Desk/edit-hovered.png';

interface EditButtonProps {
    onClick: (event: React.MouseEvent) => void; 
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
    };

    return (
        <Wrap>
            <Icon
                src={isHovered ? hoveredIcon : icon}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={handleMouseDown}
            />
        </Wrap>
    );
}

export default EditButton;
