import Checkbox from '@Components/Checkbox';
import GuestLayout from '@Layouts/GuestLayout';
import InputError from '@Components/InputError';
import InputLabel from '@Components/InputLabel';
import PrimaryButton from '@Components/PrimaryButton';
import TextInput from '@Components/TextInput';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/config';
import Cookies from 'js-cookie';

interface DataProps {
  username?: string;
  password?: string;
  remember?: boolean;
}

interface ErrorProps {
  username: string;
  password: string;
}

export default function Login() {

  const navigate = useNavigate()

  const [data, setData] = useState<DataProps>({
    username: "",
    password: "",
    remember: false,
  })
  const [errors, setErrors] = useState<ErrorProps>({
    username: "",
    password: "",
  })
  const [isAuthed, setIsAuthed] = useState(false)

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl()}/login`, {
        username: data.username,
        password: data.password
      })

      if (response.data.success) {
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleIsAuthed = (navigate) => {
    const auth = Cookies.get('is_authed')
    if (auth === "true") {
      navigate('/dashboard')
    } else {
      setIsAuthed(true)
    }
  }

  useEffect(() => {
    handleIsAuthed(navigate)
  }, [navigate])

  if (!isAuthed) {
    return null
  }

  return (
    <GuestLayout>

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="username" value="Username" />

          <TextInput
            id="username"
            type="username"
            name="username"
            value={data.username}
            className="block w-full mt-1"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => handleChange('username', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="block w-full mt-1"
            autoComplete="current-password"
            onChange={(e) => handleChange('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => handleChange('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">

          <PrimaryButton className="ml-4" disabled={false}>
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
