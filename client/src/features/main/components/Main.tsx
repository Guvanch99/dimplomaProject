import { Outlet } from 'react-router-dom'
import styled from 'styled-components/macro'
import React, { FC } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const WrapStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`

const SidebarWrapStyled = styled.div`
  
`

const OutletWrapStyled = styled.div`
  background: ${({ theme }) => theme.colors.grey100};
`

const Main: FC = () => (
  <WrapStyled>
    <Header/>
    <SidebarWrapStyled>
      <Sidebar/>
    </SidebarWrapStyled>
    <OutletWrapStyled>
      <Outlet/>
    </OutletWrapStyled>
  </WrapStyled>
)

export default Main
