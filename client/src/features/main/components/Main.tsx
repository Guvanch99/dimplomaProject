import { Outlet } from 'react-router-dom'
import styled from 'styled-components/macro'
import React, { FC, ReactNode } from 'react'
import Header, { headerHeight } from './Header'

const WrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const OutletWrapStyled = styled.div`
  height: calc(100% - ${headerHeight}px);
  background: linear-gradient(63deg, #7EE8FA 0, #EEC0C6 100%);
  overflow: auto;
`
type TProps = {
  children?: ReactNode
}
const Main: FC<TProps> = ({ children }) => (
  <WrapStyled>
    <Header/>
    <OutletWrapStyled>
      {children || <Outlet/>}
    </OutletWrapStyled>
  </WrapStyled>
)

export default Main
