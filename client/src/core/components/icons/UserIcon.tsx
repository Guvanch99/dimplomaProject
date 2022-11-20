import React, { FC } from 'react'
import { IconWrapper } from './base/IconWrapper'
import { ReactComponent as Icon } from './svg/User.svg'
import { TIconProps } from './types'

export const UserIcon: FC<TIconProps> = (props) => (
  <IconWrapper {...props} >
    <Icon />
  </IconWrapper>
)
