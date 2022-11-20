import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled, { DefaultTheme } from 'styled-components/macro'
import { flex, fontFamily } from '../../../core/styles/mixins'
import NotificationIcon from './NotificationIcon'

type TToastContainer = {
  bgColor?: keyof DefaultTheme['colors'],
  textColor?: keyof DefaultTheme['colors']
}

const CustomToastContainer = styled(ToastContainer)<TToastContainer>`
  && {
    ${fontFamily('Inter')};

    && .Toastify__toast {
      ${flex({ justify: 'space-between', align: 'center' })};
      width: 425px;
      min-height: 40px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      padding: 11px 14px 11px 16px;
      right: 45%;
      color: ${({ theme, textColor }) => theme.colors[textColor || 'darkBlack']};
      background: ${({ theme, bgColor }) => theme.colors[bgColor || 'blue200']};
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }

    && .Toastify__toast-body {
      margin: 0;
      padding: 0;
    }

    && .Toastify__toast-icon {
      display: none;
      padding: 0;
    }

    && .Toastify__close-button {
      opacity: 1;
      font-weight: 400;
    }
  }
`

const Notification = () => (
  <CustomToastContainer
    newestOnTop
    closeButton={<NotificationIcon />}
  />
)

export default Notification
