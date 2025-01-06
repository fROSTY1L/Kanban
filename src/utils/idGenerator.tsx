export const generateUniqueId = (existingTasks: { id: number }[]): number => {
    if (existingTasks.length === 0) return 1;
    const maxId = Math.max(...existingTasks.map(task => task.id));
    return maxId + 1;
  };