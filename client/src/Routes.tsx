import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom'
import Main from './features/main/components/Main'
import CreateConference from './features/createConference/components/CreateConference'
import ApiClient from './features/apiClient/components/ApiClient'
import Notifications from './features/notifications/components/Notifications'
import AuthGuard from './features/auth/guard/AuthGuard'
import NotFoundGuard from './features/notFound/guard/Guard'
import Logout from './features/auth/components/Logout'
import NotFound from './features/notFound/components/NotFound'
import Login from './features/auth/components/Login'
import Register from './features/auth/components/Register'
import Conference from './features/conference/components/Conference'
import Home from './features/home/components/Home'
import JoinConference from './features/joinConference/components/JoinConference'
import History from './features/history/components/History'

const Routes = () => (
  <BrowserRouter>
    <ApiClient />
    <Notifications />
    <RouterRoutes>
      <Route
        path="/"
        element={(
          // <AuthGuard>
          <NotFoundGuard>
            <Main />
          </NotFoundGuard>
          // </AuthGuard>
        )}
      >
        <Route index element={<Home/>}/>
        <Route path="create-conference" element={<CreateConference/>}/>
        <Route path="join-conference" element={<JoinConference/>}/>
        <Route path="history" element={<History/>}/>
        <Route path="/:id" element={<Conference/>}/>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="logout" element={<Logout />} />
      <Route
        path="*"
        element={(
          <AuthGuard>
            <NotFound />
          </AuthGuard>
        )}
      />
    </RouterRoutes>
  </BrowserRouter>
)

export default Routes
