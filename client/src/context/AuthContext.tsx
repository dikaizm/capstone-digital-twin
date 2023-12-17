import { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import axios, { AxiosInstance, isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { apiUrl } from "@/config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type AuthContextProps = {
  username: string;
  session: string;
  token: string;
  expire: number;
  createAxiosJWT: () => AxiosInstance;
};

type AuthProviderProps = {
  children?: ReactNode
}

type DecodedProps = {
  username: string;
  session_id: string;
  exp: number;
}

const AuthContext = createContext<AuthContextProps>({
  username: '',
  session: '',
  token: '',
  expire: 0,
  createAxiosJWT: () => axios
});

const ProtectedRoute = ({ children }: AuthProviderProps) => {
  const navigate: NavigateFunction = useNavigate();

  const [username, setUsername] = useState<string>("")
  const [session, setSession] = useState<string>("")
  const [token, setToken] = useState<string>("")
  const [expire, setExpire] = useState<number>(0)

  const createAxiosJWT = useCallback(() => {
    const axiosJWTInstance = axios.create();

    axiosJWTInstance.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
          try {
            const response = await axios.get(`${apiUrl()}/token`);

            config.headers.Authorization = `Bearer ${response.data.accessToken}`;

            setToken(response.data.accessToken);
            const decoded: DecodedProps = jwtDecode(response.data.accessToken);

            setUsername(decoded.username)
            setSession(decoded.session_id)
            setExpire(decoded.exp)

          } catch (error) {
            if (isAxiosError(error)) {
              if (error.response) {
                toast.error("Terjadi kesalahan")
                navigate("/");
              }
            }
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return axiosJWTInstance;
  }, [expire, setToken, setUsername, setExpire, navigate]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isNetworkError = (error: any): error is { code: 'ERR_NETWORK' } => {
      return error && error.code === 'ERR_NETWORK';
    };

    const refreshToken = async (navigate: NavigateFunction) => {
      try {

        const authCookie = Cookies.get('is_authed');
        if (authCookie !== "true") {
          navigate("/")
          return null
        }

        const response = await axios.get(`${apiUrl()}/token`);

        setToken(response.data.accessToken);

        const decoded: DecodedProps = jwtDecode(response.data.accessToken);
        setUsername(decoded.username)
        setExpire(decoded.exp)

      } catch (error) {
        if (isNetworkError(error)) {
          Cookies.set('is_authed', 'false');
          toast.error("Tidak dapat terhubung ke server")
          navigate('/');
        } else {
          toast.error("Terjadi kesalahan")
        }
      }
    }

    refreshToken(navigate);

  }, [navigate])

  const authCookie = Cookies.get('is_authed');
  if (authCookie !== "true") {
    return null
  }

  return (
    <AuthContext.Provider value={{ username, session, token, expire, createAxiosJWT }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, ProtectedRoute };
