import React, { createContext, useContext, useEffect, useState } from 'react';

// Define your types as needed
type NotificationProps = {
  message: string;
  datetime: number;
};

type NotificationContextProps = {
  notifications: NotificationProps[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

type NotificationProviderProps = {
  children: React.ReactNode;
};

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    try {
      // Retrieve notifications from local storage on component mount
      const storedNotifications = localStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error('Error accessing local storage:', error);
    }
  }, []);

  const addNotification = (message: string) => {
    try {
      const newNotification = {
        message,
        datetime: Date.now(),
      };

      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);

      // Save to local storage
      localStorage.setItem('notifications', JSON.stringify([newNotification, ...notifications]));
    } catch (error) {
      console.error('Error accessing local storage:', error);
    }
  };

  const clearNotifications = () => {
    try {
      setNotifications([]);

      // Clear local storage
      localStorage.removeItem('notifications');
    } catch (error) {
      console.error('Error accessing local storage:', error);
    }
  };

  const contextValue: NotificationContextProps = {
    notifications,
    addNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

