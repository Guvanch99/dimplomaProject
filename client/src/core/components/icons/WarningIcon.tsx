import React, { FC } from 'react'
import { IconWrapper } from './base/IconWrapper'
import { ReactComponent as Icon } from './svg/WarningFilled.svg'
import { TIconProps } from './types'

export const WarningIcon: FC<TIconProps> = (props) => (
  <IconWrapper {...props} >
    <Icon />
  </IconWrapper>
)
