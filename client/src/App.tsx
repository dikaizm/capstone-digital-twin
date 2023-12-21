import "@/App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ProtectedRoute } from "@context/AuthContext"
import Dashboard from "@Pages/Dashboard/Index"
import Welcome from "@Pages/Welcome/Index"
import { DataProvider } from "./context/DataContext"
import { DisplayProvider } from "./context/DisplayContext"
import { WindowStateProvider } from "./context/WindowStateContext"

export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={
            <Welcome />
          } />

          <Route
            path="/dashboard"
            children={[
              <Route key="page-dashboard" path="/dashboard" element=
                {
                  <ProtectedRoute>
                    <DataProvider>
                      <WindowStateProvider>
                        <DisplayProvider>
                          <Dashboard />
                        </DisplayProvider>
                      </WindowStateProvider>
                    </DataProvider>
                  </ProtectedRoute>
                }
              />
            ]}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}