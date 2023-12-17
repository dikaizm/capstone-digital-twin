import { InitialWindowOpen } from "@/types/constant";
import { ReactNode, createContext, useContext, useState } from "react";

type WindowStateContextProps = {
  windowState: WindowOpenProps;
  toggleWindowState: (key: string) => void
}

type WindowStateProviderProps = {
  children: ReactNode
}

const WindowStateContext = createContext<WindowStateContextProps>({} as WindowStateContextProps)

const WindowStateProvider = ({ children }: WindowStateProviderProps) => {
  const [windowState, setWindowState] = useState<WindowOpenProps>(InitialWindowOpen)

  const toggleWindowState = (key: string) => {
    setWindowState((prev) => {
      const state = { ...prev, [key]: !prev[key] }

      Object.keys(state).forEach((k) => {
        if (k !== key) state[k] = false
      })

      return state
    })
  }

  return (
    <WindowStateContext.Provider value={{ windowState, toggleWindowState }}>
      {children}
    </WindowStateContext.Provider>
  )
}

const useWindowState = () => {
  const context = useContext(WindowStateContext)
  if (!context) {
    throw new Error('useWindowState must be used within a WindowStateProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { WindowStateProvider, useWindowState }