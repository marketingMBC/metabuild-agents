import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Theme, Notification, Toast } from '@/lib/types';

interface AppState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Sidebar
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSidebarMobileOpen: (open: boolean) => void;

  // User
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;

  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Command Palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    // Theme
    theme: 'dark',
    setTheme: (theme) => set((state) => { state.theme = theme; }),
    toggleTheme: () => set((state) => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; }),

    // Sidebar
    sidebarCollapsed: false,
    sidebarMobileOpen: false,
    setSidebarCollapsed: (collapsed) => set((state) => { state.sidebarCollapsed = collapsed; }),
    toggleSidebar: () => set((state) => { state.sidebarCollapsed = !state.sidebarCollapsed; }),
    setSidebarMobileOpen: (open) => set((state) => { state.sidebarMobileOpen = open; }),

    // User
    user: {
      id: 'tm-1',
      name: 'Rodrigo Requena',
      email: 'rodrigo@metabuild.cl',
      role: 'admin',
    },

    // Notifications
    notifications: [],
    unreadNotificationsCount: 0,
    addNotification: (notification) =>
      set((state) => {
        state.notifications.unshift(notification);
        if (!notification.read) state.unreadNotificationsCount++;
      }),
    markNotificationRead: (id) =>
      set((state) => {
        const notif = state.notifications.find((n) => n.id === id);
        if (notif && !notif.read) {
          notif.read = true;
          state.unreadNotificationsCount = Math.max(0, state.unreadNotificationsCount - 1);
        }
      }),
    markAllNotificationsRead: () =>
      set((state) => {
        state.notifications.forEach((n) => { n.read = true; });
        state.unreadNotificationsCount = 0;
      }),
    removeNotification: (id) =>
      set((state) => {
        const idx = state.notifications.findIndex((n) => n.id === id);
        if (idx !== -1) {
          if (!state.notifications[idx].read) state.unreadNotificationsCount--;
          state.notifications.splice(idx, 1);
        }
      }),

    // Toasts
    toasts: [],
    addToast: (toast) =>
      set((state) => {
        state.toasts.push({ ...toast, id: `toast-${Date.now()}-${Math.random().toString(36).slice(2)}` });
      }),
    removeToast: (id) =>
      set((state) => {
        state.toasts = state.toasts.filter((t) => t.id !== id);
      }),

    // Command Palette
    commandPaletteOpen: false,
    setCommandPaletteOpen: (open) => set((state) => { state.commandPaletteOpen = open; }),
  }))
);
