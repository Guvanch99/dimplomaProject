import { Navigate } from 'react-router-dom'
import React from 'react'
import { useAuthContext } from '../state/useAuthState'

type TRequireAuth = {
  children: JSX.Element
}

const AuthGuard = ({ children }: TRequireAuth) => {
  const { authData } = useAuthContext()

  return authData?.id ? children : <Navigate to="/login" />
}

export default AuthGuard
