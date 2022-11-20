import { FC } from 'react'
import { IconWrapper } from './base/IconWrapper'
import { ReactComponent as Icon } from './svg/ArrowDown.svg'
import { TIconProps } from './types'

export const ArrowDownIcon: FC<TIconProps> = (props) => (
  <IconWrapper {...props}>
    <Icon />
  </IconWrapper>
)
