import constate from 'constate'
import { useLocalStorage } from 'react-use'
import { useState } from 'react'
import { TAuthData } from '../types'
import { AUTH_LOCAL_STORAGE_KEY } from '../../../core/const/localeStorage'

const useAuthState = () => {
  const [authData, setAuthData, removeAuthData] = useLocalStorage<TAuthData>(AUTH_LOCAL_STORAGE_KEY)
  const [isInactive, setIsInactive] = useState(false)

  return {
    authData,
    setAuthData,
    removeAuthData,
    isInactive,
    setIsInactive
  }
}

export const [AuthProvider, useAuthContext] = constate(useAuthState)
