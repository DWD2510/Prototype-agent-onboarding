import React, { useState, useCallback } from 'react';
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
import { mockUser } from '../data/user';
import { initialChecklist } from '../data/checklist';
import { initialAccessSystems } from '../data/accessSystems';
import { generateBotResponse } from '../utils/chatbotEngine';
import { AppContext } from './AppContextModel';

let toastCounter = 0;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser] = useState<User>(mockUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [role, setRole] = useState<UserRole>('newcomer');

  // Checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);

  // Calculate progress percentage
  const totalTasks = checklist.length;
  const completedTasks = checklist.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Access Systems
  const [accessSystems, setAccessSystems] = useState<AccessSystem[]>(initialAccessSystems);
  const [selectedAccessSystem, setSelectedAccessSystem] = useState<AccessSystem | null>(null);

  // Document modal
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
      toastCounter += 1;
      const id = `toast-${toastCounter}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            addToast(`Đã hoàn thành: "${item.title}" 🎉`, 'success');
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const updateAccessStatus = (id: string, status: AccessStatus) => {
    setAccessSystems((prev) =>
      prev.map((sys) => {
        if (sys.id === id) {
          return { ...sys, status };
        }
        return sys;
      })
    );

    const target = accessSystems.find((s) => s.id === id);
    const systemName = target?.name || id;

    if (status === 'granted') {
      addToast(`Đã đánh dấu có quyền: ${systemName} ✅`, 'success');
      setChecklist((prev) =>
        prev.map((item) =>
          item.systemId === id ? { ...item, completed: true } : item
        )
      );
    } else if (status === 'pending') {
      addToast(`Đã chuyển ${systemName} sang trạng thái "Đang chờ duyệt" ⏳`, 'info');
    }

    if (selectedAccessSystem?.id === id) {
      setSelectedAccessSystem((prev) => (prev ? { ...prev, status } : null));
    }
  };

  // Systems Drawer
  const openSystemDrawer = (system: AccessSystem) => {
    const current = accessSystems.find((s) => s.id === system.id) || system;
    setSelectedAccessSystem(current);
  };

  const closeSystemDrawer = () => {
    setSelectedAccessSystem(null);
  };

  // Docs Modal
  const openDocModal = (doc: DocumentItem) => {
    setSelectedDoc(doc);
  };

  const closeDocModal = () => {
    setSelectedDoc(null);
  };

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'bot',
      text: 'Chào Minh! Mình là Onboarding Copilot. Bạn có thắc mắc gì về quy trình, quyền truy cập hệ thống hay tài liệu dự án không?',
      timestamp: '09:00',
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsBotTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        sourceCard: response.sourceCard,
        contactCard: response.contactCard,
        isFallback: response.isFallback,
        rawQuestion: text,
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 800);
  };

  const setChatFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setChatMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const next = msg.feedback === feedback ? undefined : feedback;
          if (next === 'like') {
            addToast('Cảm ơn bạn đã phản hồi! Bot sẽ ghi nhận để hoàn thiện hơn 👍', 'info');
          } else if (next === 'dislike') {
            addToast('Đã ghi nhận phản hồi chưa hài lòng. Bạn có thể dùng tính năng "Hỏi người thật".', 'warning');
          }
          return { ...msg, feedback: next };
        }
        return msg;
      })
    );
  };

  // Real Person Modal
  const [isRealPersonModalOpen, setIsRealPersonModalOpen] = useState(false);
  const [realPersonQuestion, setRealPersonQuestion] = useState('');

  const openRealPersonModal = (question?: string) => {
    setRealPersonQuestion(question || 'Cần hỗ trợ về quy trình onboarding');
    setIsRealPersonModalOpen(true);
  };

  const closeRealPersonModal = () => {
    setIsRealPersonModalOpen(false);
  };

  const submitAskRealPerson = (contactRole: string, _question: string) => {
    setIsRealPersonModalOpen(false);
    addToast(`Đã gửi tới ${contactRole}. Thời gian phản hồi dự kiến: 2 giờ`, 'success');
  };

  // Auth
  const login = (_email: string, _otp: string) => {
    setIsLoggedIn(true);
    addToast('Đăng nhập thành công! Chào mừng bạn đến với Onboarding Copilot ✨', 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast('Đã đăng xuất', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        login,
        logout,
        role,
        setRole,
        checklist,
        toggleChecklistItem,
        progressPercent,
        accessSystems,
        updateAccessStatus,
        selectedAccessSystem,
        openSystemDrawer,
        closeSystemDrawer,
        chatMessages,
        sendMessage,
        isBotTyping,
        setChatFeedback,
        toasts,
        addToast,
        removeToast,
        isRealPersonModalOpen,
        realPersonQuestion,
        openRealPersonModal,
        closeRealPersonModal,
        submitAskRealPerson,
        selectedDoc,
        openDocModal,
        closeDocModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

