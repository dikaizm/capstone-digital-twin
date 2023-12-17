import GuestLayout from "@/views/Layouts/GuestLayout";
import PrimaryButton from "@/views/Components/PrimaryButton";
import SecondaryButton from "@/views/Components/SecondaryButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import imgBanner from "@assets/image/welcome-banner.png"
import { LoginModal } from "@/views/Components/Modals/LoginModal";

export default function Welcome() {
  const navigate = useNavigate()

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  const [isAuthed, setIsAuthed] = useState<boolean>(false)

  useEffect(() => {
    const authCookie = Cookies.get('is_authed');
    if (authCookie === "true") {
      setIsAuthed(true)
    }
  }, [])

  return (
    <GuestLayout>
      <div className="relative w-full h-full">
        <div className="h-[28rem]">
          <img className="object-cover w-full h-full" src={imgBanner} alt="Digital twin banner" />
        </div>

        <div className="absolute flex justify-center w-full top-60">
          <div className="px-8 py-6 mx-4 sm:mx-8 w-[48rem] bg-white rounded-2xl drop-shadow-sm">
            <div className="flex flex-col gap-6 text-left text-black">
              <h1 className="text-4xl font-medium">Inalum Digital Twin</h1>

              <p className="text-xl leading-8 text-gray-500">Digital Twin adalah model digital dari sistem atau proses fisik yang digunakan untuk mengoptimalkan pemantauan proses produksi pada casting plant.</p>

              <div className="mt-5">
                {isAuthed ? (
                  <SecondaryButton onClick={() => {
                    navigate('/dashboard')
                  }}>Buka Dashboard</SecondaryButton>
                ) : (
                  <PrimaryButton onClick={() => {
                    setShowLoginModal(true)
                  }}>Masuk</PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      )}
    </GuestLayout>
  )
}