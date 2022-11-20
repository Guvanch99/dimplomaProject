import styled from 'styled-components/macro'
import { CloseLineIcon } from '../../../core/components/icons/CloseLineIcon'

const IconWrapper = styled.div`
color: ${({ theme }) => theme.colors.darkBlack};
`

const NotificationIcon = () => (
  <IconWrapper>
    <CloseLineIcon width={20} height={20}/>
  </IconWrapper>
)
export default NotificationIcon
