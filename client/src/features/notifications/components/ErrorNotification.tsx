import { FC } from 'react'
import styled from 'styled-components/macro'
import { flex, fontFamily } from '../../../core/styles/mixins'
import { WarningIcon } from '../../../core/components/icons/WarningIcon'

const Wrapper = styled.div`
  ${flex({ justify: 'flex-start', align: 'flex-start' })};
`

const MessageStyled = styled.p`
  ${fontFamily('Inter')};
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkBlack};
  margin-left: 10px;
  width: 100%;
  max-width: 335px;
`

type TProps = {
  message: string
}

const ErrorNotification: FC<TProps> = ({ message }) => (
  <Wrapper>
    <WarningIcon width={20} height={20}/>
    <MessageStyled>{message}</MessageStyled>
  </Wrapper>
)

export default ErrorNotification
