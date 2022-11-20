import { FC } from 'react'
import { IconWrapper } from './base/IconWrapper'
import { ReactComponent as Icon } from './svg/ArrowUp.svg'
import { TIconProps } from './types'

export const ArrowUpIcon: FC<TIconProps> = (props) => (
  <IconWrapper {...props}>
    <Icon />
  </IconWrapper>
)
