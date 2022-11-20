import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { apiClient } from '../../core/api/apiClient'
import { TAuthData, TFormLoginData, TFormRegisterData } from './types'
import { useAuthContext } from './state/useAuthState'

enum QueryKeys {
  Login = 'Login',
  Register = 'Register'
}

export const logoutUrl = '/auth/logout'

async function login(formData: TFormLoginData, setAuthData: (data: TAuthData) => void) {
  try {
    const response = await apiClient.post<TAuthData>('/auth/login', { ...formData })
    setAuthData(response.data)
  } catch (err: any) {
    throw new Error('Something went wrong')
  }
}

async function register(formData: TFormRegisterData, setAuthData: (data: TAuthData) => void) {
  try {
    const response = await apiClient.post<TAuthData>('/auth/register', { ...formData })
    setAuthData(response.data)
  } catch (err: any) {
    throw new Error('Something went wrong')
  }
}

export function useLoginMutation() {
  const navigate = useNavigate()
  const key = QueryKeys.Login
  const { setAuthData } = useAuthContext()

  return useMutation<void, Error, TFormLoginData>(
    (formData) => login(formData, setAuthData),
    {
      mutationKey: key,
      onSuccess: () => navigate('/')
    }
  )
}

export function useRegisterMutation() {
  const navigate = useNavigate()
  const key = QueryKeys.Register
  const { setAuthData } = useAuthContext()

  return useMutation<void, Error, TFormRegisterData>(
    (formData) => register(formData, setAuthData),
    {
      mutationKey: key,
      onSuccess: () => navigate('/')
    }
  )
}

async function logout(): Promise<void> {
  try {
    await apiClient.post(logoutUrl)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}
export function useLogoutMutation() {
  return useMutation<void, Error>(logout)
}
