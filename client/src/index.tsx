import React from 'react'
import ReactDOM from 'react-dom/client'
import styled, { ThemeProvider } from 'styled-components/macro'
import { QueryClientProvider } from 'react-query'
import Routes from './Routes'
import { GlobalStyles } from './core/styles/GlobalStyles'
import { styledTheme } from './core/styles/styledTheme'
import { queryClient } from './core/api/queryClient'
import { NotificationProvider } from './features/notifications/state/useNotification'
import { AuthProvider } from './features/auth/state/useAuthState'

export const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
`

const App = () => (
  <ThemeProvider theme={styledTheme}>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ContainerStyled>
        <AuthProvider>
          <NotificationProvider>
            <Routes />
          </NotificationProvider>
        </AuthProvider>
      </ContainerStyled>
    </QueryClientProvider>
  </ThemeProvider>
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<React.StrictMode><App /></React.StrictMode>)
