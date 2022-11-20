import React, { FC, ReactNode } from 'react'
import styled from 'styled-components/macro'

export const CardStyled = styled.div<{ noPadding?: boolean }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey200};
  box-shadow: ${({ theme }) => theme.colors.shadow100};
  border-radius: 6px;
  padding: ${({ noPadding }) => (noPadding ? '0' : '16px')};
`

type TProps = {
  noPadding?: boolean
  children: ReactNode
}

const Card: FC<TProps> = ({ children, noPadding }) => (
  <CardStyled noPadding={noPadding}>
    {children}
  </CardStyled>
)
export default Card
