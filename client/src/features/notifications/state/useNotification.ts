import constate from 'constate'
import { useCallback } from 'react'
import { toast, ToastContent } from 'react-toastify'

import { DefaultTheme, useTheme } from 'styled-components/macro'
import { TNotificationVariant } from '../types'

const ToastVariant: {[key in TNotificationVariant]:
  {
    background: keyof DefaultTheme['colors'],
    color: keyof DefaultTheme['colors']
  } } = {
    error: {
      background: 'red200',
      color: 'darkBlack'
    },
    warn: {
      background: 'orange',
      color: 'white'
    },
    success: {
      background: 'blue200',
      color: 'darkBlack'
    }
  }

function showToast(variant: TNotificationVariant) {
  const { colors } = useTheme()

  return (content: ToastContent) => toast[variant](
    content,
    {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      style: {
        background: colors[ToastVariant[variant].background].toString(),
        color: colors[ToastVariant[variant].color].toString()
      }
    }
  )
}

const useNotification = () => ({
  showErrorNotification: useCallback(showToast('error'), []),
  showWarningNotification: useCallback(showToast('warn'), []),
  showSuccessNotification: useCallback(showToast('success'), [])
})

export const [NotificationProvider, useNotificationContext] = constate(useNotification)
