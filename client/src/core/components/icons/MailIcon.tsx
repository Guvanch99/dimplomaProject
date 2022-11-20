import { FC } from 'react'
import { IconWrapper } from './base/IconWrapper'
import { ReactComponent as Icon } from './svg/Mail.svg'
import { TIconProps } from './types'

export const MailIcon: FC<TIconProps> = (props) => (
  <IconWrapper {...props}>
    <Icon />
  </IconWrapper>
)
