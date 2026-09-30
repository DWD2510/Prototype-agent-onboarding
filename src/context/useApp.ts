import { useContext } from 'react';
import { AppContext } from './AppContextModel';
import type { AppContextType } from './AppContextModel';

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
