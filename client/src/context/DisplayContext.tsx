import { createContext, useContext, useState } from "react";

type DisplayContextProps = {
  displayState: boolean;
  toggleDisplay: () => void;
}

type DisplayProviderProps = {
  children: React.ReactNode;
}

const DisplayContext = createContext<DisplayContextProps>({} as DisplayContextProps)

const DisplayProvider = ({ children }: DisplayProviderProps) => {
  const [displayState, setDisplayState] = useState(true)

  const toggleDisplay = () => {
    setDisplayState(!displayState)
  }

  return (
    <DisplayContext.Provider value={{ displayState, toggleDisplay }}>
      {children}
    </DisplayContext.Provider>
  )
}

const useDisplay = () => {
  const context = useContext(DisplayContext)
  if (!context) {
    throw new Error('useDisplay must be used within a DisplayProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DisplayProvider, useDisplay }