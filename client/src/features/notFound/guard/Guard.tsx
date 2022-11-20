import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-use'
import constate from 'constate'
import NotFound from '../components/NotFound'

const useContextState = () => {
  const [showNotFound, setShowNotFound] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (showNotFound) setShowNotFound(false)
  }, [location.pathname])

  return {
    showNotFound,
    setShowNotFound
  }
}

export const [NotFoundProvider, useNotFoundContext] = constate(useContextState)

type TProps = {
  children: JSX.Element
}

const NotFoundGuard: FC<TProps> = ({ children }) => {
  const { showNotFound } = useNotFoundContext()

  return showNotFound ? <NotFound/> : children
}

export default NotFoundGuard
