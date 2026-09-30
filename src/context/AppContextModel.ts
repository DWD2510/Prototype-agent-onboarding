import { createContext } from 'react';
import type {
  AccessStatus,
  AccessSystem,
  ChecklistItem,
  ChatMessage,
  DocumentItem,
  ToastMessage,
  User,
  UserRole,
} from '../types';

export interface AppContextType {
  currentUser: User;
  isLoggedIn: boolean;
  login: (email: string, otp: string) => void;
  logout: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;

  // Checklist & Progress
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  progressPercent: number;

  // Systems
  accessSystems: AccessSystem[];
  updateAccessStatus: (id: string, status: AccessStatus) => void;
  selectedAccessSystem: AccessSystem | null;
  openSystemDrawer: (system: AccessSystem) => void;
  closeSystemDrawer: () => void;

  // Chat
  chatMessages: ChatMessage[];
  sendMessage: (text: string) => void;
  isBotTyping: boolean;
  setChatFeedback: (messageId: string, feedback: 'like' | 'dislike') => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Real Person Modal
  isRealPersonModalOpen: boolean;
  realPersonQuestion: string;
  openRealPersonModal: (question?: string) => void;
  closeRealPersonModal: () => void;
  submitAskRealPerson: (department: string, question: string) => void;

  // Doc Preview
  selectedDoc: DocumentItem | null;
  openDocModal: (doc: DocumentItem) => void;
  closeDocModal: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
