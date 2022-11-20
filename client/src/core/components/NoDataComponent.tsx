import { FC } from 'react'
import styled from 'styled-components/macro'
import { EmptyFileIcon } from './icons/EmptyFileIcon'
import { flex, fontFamily } from '../styles/mixins'
import { NoResultsIcon } from './icons/NoResultsIcon'

export const ContainerStyled = styled.div`
  ${flex({ justify: 'center', align: 'center' })};
  flex-direction: column;
  margin-top: 52px;
  color: ${({ theme }) => theme.colors.grey600};
`

const IconContainerStyled = styled.div`
  color: ${({ theme }) => theme.colors.grey600a6};
`

export const CaptionStyled = styled.div`
  ${fontFamily('Inter')};
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.darkBlack};
`

type TProps = {
  text?: string
  iconWidth?: number
  iconHeight?: number
  children?: any
  icon?: React.ReactNode
}

const NoDataComponent: FC<TProps> = ({
  text,
  iconHeight,
  iconWidth,
  children,
  icon
}) => (
  <ContainerStyled>
    {!children ? (
      <IconContainerStyled>
        {icon || <EmptyFileIcon width={iconWidth || 32} height={iconHeight || 32} />}
      </IconContainerStyled>
    ) : (
      <NoResultsIcon />
    )}

    <CaptionStyled>
      {children}
      {text}
    </CaptionStyled>
  </ContainerStyled>
)

export default NoDataComponent
