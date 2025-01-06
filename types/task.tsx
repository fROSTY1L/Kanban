export interface TaskProps {
    id: number;
    type: 'todo' | 'in_progress' | 'review' | 'done';
    startDay: number;
    endDay: number;
    text: string;
    setIsEditing: (value: boolean) => void;
    editButton?: boolean;
  }
  
  export type TaskWithoutSetIsEditing = Omit<TaskProps, 'setIsEditing'>;
  
  export type TaskType = TaskProps['type'];