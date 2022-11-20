import { FC } from 'react'
import { IconWrapper } from './base/IconWrapper'
import { ReactComponent as Icon } from './svg/CloseLine.svg'
import { TIconProps } from './types'

export const CloseLineIcon: FC<TIconProps> = (props) => (
  <IconWrapper {...props}>
    <Icon />
  </IconWrapper>
)
