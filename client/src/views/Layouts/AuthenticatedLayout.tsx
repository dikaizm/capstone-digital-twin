import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';

import Sidebar from '@Layouts/Sidebar';
import Topbar from '@Layouts/Topbar';
import SecondarySidebar from '@Layouts/SecondarySidebar';
import { AuthContext, useAuth } from '@/context/AuthContext';

interface UserProps {
  name: string;
  role: string;
}

export default function Authenticated({ children }: ParentProps) {

  const { username, role } = useAuth()

  const [user, setUser] = useState<UserProps>({ name: '', role: '' })

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false)

  const getUserInfo = (username: string, role: string) => {
    // const cookie = Cookies.get('uid');
    // if (cookie) {
    //   const [name, role] = cookie.split('/').map(part => part.split('@@')[1]);

    //   if (name && role) {
    //     setUser({ name, role });
    //   }
    // }
    if (username && role) {
      setUser({ name: username, role: role })
    }
  }

  useEffect(() => {
    getUserInfo(username, role);
  }, [username, role]);

  return (
    <div className="w-full min-h-screen bg-scene">
      <Toaster
        containerClassName='toaster-wrapper'
        containerStyle={{
          fontSize: '0.75rem',
        }}
        toastOptions={{
          style: {
            background: '#282B39',
            color: '#fff',
            borderRadius: '999px',
            border: '1px solid #5E6982',
          }
        }}
      />

      <Sidebar user={user} state={isSidebarOpen} setState={setIsSidebarOpen} />

      <Topbar
        stateLeft={isSidebarOpen}
        stateRight={isRightSidebarOpen}
        setStateRight={setIsRightSidebarOpen}
      />

      <SecondarySidebar state={isRightSidebarOpen} />

      <main className='w-full h-screen'>
        {children}
      </main>
    </div>
  );
}
