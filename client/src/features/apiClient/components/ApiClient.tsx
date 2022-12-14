import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { apiClient } from '../../../core/api/apiClient'
import { useAuthContext } from '../../auth/state/useAuthState'

function useRequestInterceptor() {
  const { authData } = useAuthContext()
  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use(
      (config) => {
        console.log('authData0', authData)
        if (config.headers && authData?.accessToken) {
          console.log('authData1', authData)
          config.headers.Authorization = `Bearer ${authData.accessToken!}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    return () => apiClient.interceptors.request.eject(interceptor)
  }, [authData])
}

export const useUnauthorisedHandle = () => {
  const navigate = useNavigate()
  const { removeAuthData } = useAuthContext()
  return useCallback(({ response }: AxiosError) => {
    if (!response) {
      return
    }
    if (response.status === 403) {
      removeAuthData()
      navigate('/')
    }
  }, [])
}

function useErrorResponseInterceptor() {
  const unauthorisedHandle = useUnauthorisedHandle()

  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (res) => res,
      async (err: AxiosError) => {
        if (axios.isAxiosError(err)) {
          unauthorisedHandle(err)
        }
        return Promise.reject(err)
      }
    )
    return () => apiClient.interceptors.request.eject(interceptor)
  }, [unauthorisedHandle])
}

const ApiClient = () => {
  useRequestInterceptor()
  useErrorResponseInterceptor()

  return null
}
export default ApiClient
