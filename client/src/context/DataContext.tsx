import { InitialDataField } from '@/types/constant';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import { wsUrl } from '@/config';
import toast from 'react-hot-toast';
import { useNotification } from './NotificationContext';

interface MessageProps {
  key: string;
  equipment_name: string;
  tag_name: string;
  value: number;
}

type DataProviderProps = {
  children: React.ReactNode;
}

type WebSocketContextProps = {
  data: DataFieldProps;
}

const WebSocketContext = createContext<WebSocketContextProps>({} as WebSocketContextProps);

const useData = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [data, setData] = useState(InitialDataField)
  const { session } = useContext(AuthContext)
  const { addNotification } = useNotification()

  useEffect(() => {
    if (!window.WebSocket) {
      alert('Your browser does not support WebSocket connections');
      return;
    }

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      socketRef.current = new WebSocket(`${wsUrl()}?session=${session}`);

      socketRef.current.addEventListener('open', () => {
        toast.success('WebSocket connection ' + 'success')
        addNotification("WebSocket connection " + 'success ✅')
      });

      socketRef.current.addEventListener('message', (event) => {
        const message: MessageProps = JSON.parse(event.data);

        message['key'] = message.equipment_name

        setData((prevData) => ({
          ...prevData,
          [message.key]: {
            ...prevData[message.key],
            tag: {
              ...prevData[message.key]?.tag,
              [message.tag_name]: {
                ...prevData[message.key]?.tag?.[message.tag_name],
                value: message.value,
              },
            },
          },
        }));
      });

      socketRef.current.addEventListener('close', () => {
        toast.error('WebSocket connection ' + 'closed')
        addNotification("WebSocket connection " + 'closed ❌')
      });
    }
  }, [session, data, addNotification]);

  return (
    <WebSocketContext.Provider value={{ data }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { DataProvider, useData }
