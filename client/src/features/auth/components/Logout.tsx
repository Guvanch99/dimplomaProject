import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../state/useAuthState'
import { useLogoutMutation } from '../querries'

const Logout = () => {
  const { removeAuthData } = useAuthContext()
  const { mutateAsync } = useLogoutMutation()
  const navigate = useNavigate()

  useEffect(() => {
    mutateAsync().finally(() => {
      removeAuthData()
      navigate('/login')
    })
  }, [])

  return null
}
export default Logout
