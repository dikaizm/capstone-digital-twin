import { apiUrl } from "@/config";
import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import ApplicationLogo from "../ApplicationLogo";
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";

type LoginModalProps = {
  show?: boolean;
  onClose?: () => void;
}

export function LoginModal({ show, onClose }: LoginModalProps) {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      if (!username || !password) {
        toast.error("Isi semua form!")
        return
      }

      const response = await axios.post(`${apiUrl()}/login`, {
        username: username,
        password: password
      })

      if (response.data.success) {
        navigate('/dashboard')
        return
      }
    } catch (error) {
      toast.error("Gagal masuk, silahkan coba lagi")
    }
  };

  return (
    <Modal maxWidth="md" show={show} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 px-8 py-12 text-black">
        <div className="space-y-6">
          <div className="space-y-4">
            <ApplicationLogo logoFull className="h-12" />

            <h3 className="max-w-xs text-2xl font-semibold text-center">Selamat datang di Inalum Digital Twin</h3>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-5">
            <TextInput id="username" placeholder="Username" state={{
              value: username,
              setValue: setUsername,
            }}>Username</TextInput>

            <TextInput id="password" placeholder="Password" type="password" state={{
              value: password,
              setValue: setPassword,
            }}>Password</TextInput>

            <PrimaryButton className="justify-center w-full">Masuk</PrimaryButton>
          </form>

        </div>
      </div>

      <div className="absolute top-4 right-4">
        <button className="p-1 rounded-full hover:bg-slate-200" type="button" onClick={() => onClose && onClose()}>
          <svg className="w-6 text-gray-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Modal>
  )
}