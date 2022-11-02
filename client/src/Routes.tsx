import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom'
import Main from "./features/main/components/Main";
import Home from "./features/home/components/Home";

const Routes=()=>(
  <BrowserRouter>
    <RouterRoutes>
      <Route path='/' element={<Main/>}>
        <Route index element={<Home/>}/>
      </Route>
    </RouterRoutes>
  </BrowserRouter>
)

export default Routes
