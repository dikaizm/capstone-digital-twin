import ApplicationLogo from '@Components/ApplicationLogo';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../Components/PrimaryButton';
import SecondaryButton from '../Components/SecondaryButton';
import { apiUrl } from '@/config';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { LoginModal } from '../Components/Modals/LoginModal';

export default function Guest({ children }: ParentProps) {
  const [isAuthed, setIsAuthed] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  useEffect(() => {
    const authCookie = Cookies.get('is_authed');
    if (authCookie === "true") {
      setIsAuthed(true)
    }
  }, [])

  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await axios.get(`${apiUrl()}/logout`)

    if (response.data.success) {
      navigate('/')
      window.location.reload()
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Toaster />

      <div className='fixed z-50 flex items-center justify-between w-full h-20 gap-2 px-4 bg-white sm:px-8'>
        <div className='box-border w-40'>
          <Link to="/">
            <ApplicationLogo logoFull className="w-full h-10" />
          </Link>
        </div>

        <div className='flex h-12 gap-3'>
          {isAuthed ? (
            <>
              <SecondaryButton className='hidden sm:inline-block' onClick={() => {
                navigate('/dashboard')
              }}>Buka Dashboard</SecondaryButton>
              <SecondaryButton onClick={() => handleLogout()}>Keluar</SecondaryButton>
            </>
          ) : (
            <PrimaryButton onClick={() => {
              setShowLoginModal(true)
            }}>Masuk</PrimaryButton>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      )}

      <main className='relative w-full h-full'>
        {children}
      </main>
    </div>
  )
}
