import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Task, ChatMessage } from '../types';

interface AppState {
  user: User | null;
  tasks: Task[];
  messages: ChatMessage[];
  darkMode: boolean;
  setUser: (user: User | null) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  addMessage: (message: ChatMessage) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      tasks: [
        {
          id: '1',
          title: 'Welcome to AI Assistant',
          description: 'This is a sample task to get you started. Try checking it off!',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      messages: [
        {
          id: '1',
          content: "Hello! I'm your AI assistant. How can I help you today?",
          role: 'assistant',
          timestamp: new Date()
        }
      ],
      darkMode: false,
      setUser: (user) => set({ user }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'ai-assistant-storage',
    }
  )
);