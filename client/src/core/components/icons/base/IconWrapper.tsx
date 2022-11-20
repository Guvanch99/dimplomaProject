import React, { FC, ReactElement } from 'react'
import styled from 'styled-components/macro'

const WrapStyled = styled.span`
  display: inline-block;
  line-height: 0;
  text-align: center;
`

export type TIconWrapperProps = {
  children: ReactElement;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
} & Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

export const IconWrapper: FC<TIconWrapperProps> = ({
  children,
  onClick,
  ...props
}) => {
  const svgBaseProps = {
    fill: 'currentColor',
    'aria-hidden': 'true',
    'user-select': 'none',
    focusable: 'false'
  }

  return (
    <WrapStyled
      role="img"
      onClick={onClick}
    >
      {React.cloneElement(children, { ...svgBaseProps, ...props })}
    </WrapStyled>
  )
}
