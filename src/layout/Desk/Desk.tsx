import { useEffect, useState, useCallback } from "react";
import Card from "../../components/Desk/Card";
import Task, { TaskProps } from "../../components/Desk/Task";
import { Wrap } from "../../styles/Desk/Desk.style";
import todoIcon from "../../assets/Desk/bxs_happy-alt.png";
import tasksData from '../../data/tasks.json'; 
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatUnixTime } from '../../utils/dateUtils';
import { generateUniqueId } from '../../utils/idGenerator';

const TASKS_STORAGE_KEY = 'kanban_tasks';

const Desk = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const searchQuery = useSelector((state: RootState) => state.search.value);

  useEffect(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks).map((task: TaskProps) => ({ ...task, setIsEditing })));
    } else {
      setTasks(tasksData.map(task => ({ ...task, setIsEditing })));
    }
  }, [setIsEditing]);

  const saveTasks = useCallback((updatedTasks: TaskProps[]) => {
    const tasksToStore = updatedTasks.map(({ ...task }) => task);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToStore));
  }, []);

  const handleTaskUpdate = useCallback((taskId: number, updates: Partial<TaskProps>) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, [saveTasks]);

  const filterTasks = (tasks: TaskProps[], type: string) => {
    return tasks
      .filter(task => task.type === type)
      .filter(task => {
        const searchStr = searchQuery.toLowerCase();
        const description = task.text.toLowerCase();
        const startDate = formatUnixTime(task.startDay);
        const endDate = formatUnixTime(task.endDay);

        return description.includes(searchStr) ||
               startDate.includes(searchStr) ||
               endDate.includes(searchStr);
      })
      .sort((a, b) => a.startDay - b.startDay);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (isEditing) return;

    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;
    const draggedTask = tasks.find(task => task.id === Number(taskId));

    if (overId === 'delete-zone') {
        if (draggedTask && draggedTask.type === 'done') {
            const updatedTasks = tasks.filter(task => task.id !== draggedTask.id);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        }
        return;
    }

    const updatedTasks = tasks.map(task => 
        task.id === Number(taskId) 
            ? { ...task, type: overId } 
            : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteAllDone = () => {
    const updatedTasks = tasks.filter(task => task.type !== 'done');
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const addTask = (type: string) => {
    const newTask: TaskProps = {
      id: generateUniqueId(tasks),
      type: type,
      startDay: Date.now(),
      endDay: Date.now() + 86400000,
      text: 'Новая задача',
      setIsEditing
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <Wrap>
      <DndContext onDragEnd={handleDragEnd}>
        <Card id={'todo'} title="To Do" icon={todoIcon} button="add" onAddTask={() => addTask('todo')}>
          {filterTasks(tasks, 'todo').map(task => (
            <Task 
              key={task.id} 
              {...task} 
              editButton={true}
              onUpdate={handleTaskUpdate}
            />
          ))}
        </Card>
        <Card id={'in_progress'} title="In progress" icon={todoIcon}>
          {filterTasks(tasks, 'in_progress').map(task => 
            <Task 
              key={task.id} 
              {...task}
              onUpdate={handleTaskUpdate}
            />
          )}
        </Card>
        <Card id={'review'} title="Review" icon={todoIcon}>
          {filterTasks(tasks, 'review').map(task => 
            <Task 
              key={task.id} 
              {...task}
              onUpdate={handleTaskUpdate}
            />
          )}
        </Card>
        <Card 
          id={'done'} 
          title="Done" 
          icon={todoIcon} 
          button="delete"
          onDeleteAll={handleDeleteAllDone}
        >
          {filterTasks(tasks, 'done').map(task => 
            <Task 
              key={task.id} 
              {...task}
              onUpdate={handleTaskUpdate}
            />
          )}
        </Card>
      </DndContext>
    </Wrap>
  );
}

export default Desk;