import { useDroppable } from '@dnd-kit/core';
import { Header, Icon, Title, Wrap, Main } from '../../styles/Desk/Card.style';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';

interface CardProps {
    id: string,
    title: string,
    icon: string,
    button?: 'add' | 'delete',
    children?: React.ReactNode;
    onAddTask?: () => void;
    onDeleteAll?: () => void;
}

const Card = ({ id, title, icon, button, children, onAddTask, onDeleteAll }: CardProps) => {
    const { setNodeRef: setMainRef } = useDroppable({
        id: id
    });
  
    return (
        <Wrap>
            <Header>
                <Title>
                    <Icon src={icon}/>
                    {title} 
                </Title>
                {button === 'delete' && (
                    <DeleteButton onDeleteAll={onDeleteAll} />
                )}
                {button === 'add' && (
                    <AddButton onClick={onAddTask} />
                )}
            </Header>
            <Main ref={setMainRef}>
                {children}
            </Main>
        </Wrap>
    );
}

export default Card;
