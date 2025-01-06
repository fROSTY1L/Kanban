import { useState, useEffect } from 'react';
import { Row, Title, Value, Wrap, ButtonRow, TextArea, Input } from "../../styles/Desk/Task.style";
import EditButton from "./EditButton";
import { useDraggable } from '@dnd-kit/core';
import { ButtonsContainer } from '../../styles/Desk/ActionButton.style';
import ActionButton from './ActionButton';
import crossIcon from '../../assets/Desk/cross.png';
import checkIcon from '../../assets/Desk/check.png';
import { formatUnixTime, parseDate } from '../../utils/dateUtils';

export interface TaskProps {
    id: number;
    type: string | number;
    startDay: number;
    endDay: number;
    text: string;
    editButton?: boolean;
    setIsEditing: (isEditing: boolean) => void;
    onUpdate?: (taskId: number, updates: Partial<TaskProps>) => void;
}

const Task = (props: TaskProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [startDate, setStartDate] = useState(formatUnixTime(props.startDay));
    const [endDate, setEndDate] = useState(formatUnixTime(props.endDay));
    const [description, setDescription] = useState(props.text);

    // Update local state when props change
    useEffect(() => {
        setStartDate(formatUnixTime(props.startDay));
        setEndDate(formatUnixTime(props.endDay));
        setDescription(props.text);
    }, [props.startDay, props.endDay, props.text]);

    const isPastDueDate = (date: string) => {
        const timestamp = parseDate(date);
        return timestamp < Date.now();
    };
    
    const isInDoneColumn = props.type === 'done';

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(!isEditing);
        props.setIsEditing(!isEditing);
    };

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const startTimestamp = parseDate(startDate);
        const endTimestamp = parseDate(endDate);

        // Validate dates
        if (startTimestamp > endTimestamp) {
            setStartDate(formatUnixTime(props.startDay));
            setEndDate(formatUnixTime(props.endDay));
            return;
        }

        // Update task data
        if (props.onUpdate) {
            props.onUpdate(props.id, {
                startDay: startTimestamp,
                endDay: endTimestamp,
                text: description
            });
        }

        setIsEditing(false);
        props.setIsEditing(false);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setStartDate(formatUnixTime(props.startDay));
        setEndDate(formatUnixTime(props.endDay));
        setDescription(props.text);
        setIsEditing(false);
        props.setIsEditing(false);
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: String(props.id),
        disabled: isEditing
    });

    const style = transform && !isEditing
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            cursor: 'grabbing' as const,
            position: 'relative' as const,
            zIndex: 1000,
            transformOrigin: 'center center'
          }
        : undefined;

    const pastDueColor = 'rgba(252, 54, 57, 0.6)';

    return (
        <Wrap 
            ref={setNodeRef}
            {...(!isEditing ? listeners : {})}
            {...(!isEditing ? attributes : {})}
            style={style}
        >
            <Row>
                <Title>Начало:</Title>
                {isEditing ? (
                    <Input 
                        type="text" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                ) : (
                    <Value>{startDate}</Value>
                )}
            </Row>
            <Row>
                <Title>Окончание:</Title>
                {isEditing ? (
                    <Input 
                        type="text" 
                        value={endDate}
                        style={{ 
                            color: isInDoneColumn ? 'inherit' : (isPastDueDate(endDate) ? pastDueColor : 'inherit')
                        }}
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                ) : (
                    <Value style={{ 
                        color: isInDoneColumn ? 'inherit' : (isPastDueDate(endDate) ? pastDueColor : 'inherit')
                    }}>
                        {endDate}
                    </Value>
                )}
            </Row>
            <Row>
                <Title>Описание:</Title>
                {isEditing ? (
                    <TextArea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                ) : (
                    <Value>{description}</Value>
                )}
            </Row>
            {props.editButton && (
                <ButtonRow>
                    {!isEditing ? (
                        <EditButton onClick={handleEditClick} />
                    ) : (
                        <ButtonsContainer>
                            <ActionButton 
                                icon={crossIcon}
                                onClick={handleCancel}
                            />
                            <ActionButton 
                                icon={checkIcon}
                                onClick={handleSave}
                            />
                        </ButtonsContainer>
                    )}
                </ButtonRow>
            )}
        </Wrap>
    );
}

export default Task;