import { Wrap } from '../../styles/Desk/AddButton.style';

interface AddButtonProps {
    onClick?: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
    return (
        <Wrap onClick={onClick}>
            + Добавить
        </Wrap>
    );
};

export default AddButton;
