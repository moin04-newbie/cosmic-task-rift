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

// Demo tasks to populate the store initially
const initialTasks: Task[] = [
  {
    id: 'demo-task-1',
    name: 'Complete project dashboard',
    description: 'Finish the analytics dashboard with all charts and metrics',
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'demo-task-2',
    name: 'Review team presentations',
    description: 'Go through all presentation slides and provide feedback',
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
  {
    id: 'demo-task-3',
    name: 'Plan website redesign',
    description: 'Create wireframes and task list for the upcoming website refresh',
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      
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
