
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/types/task';

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  getCompletedTasksCount: () => number;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (task) => {
        set((state) => ({
          tasks: [task, ...state.tasks],
        }));
      },
      
      toggleTaskCompletion: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      getCompletedTasksCount: () => {
        return get().tasks.filter(task => task.completed).length;
      },
    }),
    {
      name: 'cybertask-storage',
    }
  )
);
