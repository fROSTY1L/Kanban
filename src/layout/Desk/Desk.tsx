import { useEffect, useState } from "react";
import Card from "../../components/Desk/Card";
import Task, { TaskProps } from "../../components/Desk/Task";
import { Wrap } from "../../styles/Desk/Desk.style";
import todoIcon from "../../assets/Desk/bxs_happy-alt.png";
import tasksData from '../../data/tasks.json'; 
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatUnixTime } from '../../utils/dateUtils';

const TASKS_STORAGE_KEY = 'kanban_tasks';

const Desk = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const searchQuery = useSelector((state: RootState) => state.search.value);

  useEffect(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks).map(task => ({ ...task, setIsEditing })));
    } else {
      setTasks(tasksData.map(task => ({ ...task, setIsEditing })));
    }
  }, [setIsEditing]);

  // Сохраняем задачи в localStorage при изменении
  useEffect(() => {
    if (tasks.length > 0) {
      const tasksToStore = tasks.map(({ setIsEditing, ...task }) => task);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToStore));
    }
  }, [tasks]);

  // Функция фильтрации задач по поисковому запросу
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

    // Проверяем, если перетаскиваемый элемент над зоной удаления
    if (overId === 'delete-zone') {
        if (draggedTask && draggedTask.type === 'done') {
            // Удаляем задачу, если она из столбца Done
            setTasks(prevTasks => prevTasks.filter(task => task.id !== draggedTask.id));
        }
        return;
    }

    // Если не в зоне удаления, обрабатываем перемещение между столбцами
    setTasks(prevTasks => prevTasks.map(task => 
        task.id === Number(taskId) 
            ? { ...task, type: overId } 
            : task
    ));
  };

  const handleDeleteAllDone = () => {
    setTasks(tasks => tasks.filter(task => task.type !== 'done'));
  };

  const addTask = (type: string) => {
    const newTask: TaskProps = {
      id: tasks.length + 1,
      type: type,
      startDay: Date.now(),
      endDay: Date.now() + 86400000,
      text: 'Новая задача',
      setIsEditing: setIsEditing
    };

    setTasks([...tasks, newTask]);
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
            />
          ))}
        </Card>
        <Card id={'in_progress'} title="In progress" icon={todoIcon}>
          {filterTasks(tasks, 'in_progress').map(task => 
            <Task key={task.id} {...task} />
          )}
        </Card>
        <Card id={'review'} title="Review" icon={todoIcon}>
          {filterTasks(tasks, 'review').map(task => 
            <Task key={task.id} {...task} />
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
            <Task key={task.id} {...task} />
          )}
        </Card>
      </DndContext>
    </Wrap>
  );
}

export default Desk;
