import { FC } from 'react'
import { IconWrapper } from './base/IconWrapper'
import { ReactComponent as Icon } from './svg/EmptyFile.svg'
import { TIconProps } from './types'

export const EmptyFileIcon: FC<TIconProps> = ({ width, height }) => (
  <IconWrapper width={width} height={height}>
    <Icon />
  </IconWrapper>
)
