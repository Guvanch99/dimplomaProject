import { RegisterOptions, ValidateResult } from 'react-hook-form'
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../const/regexes'

export const requiredRule: (message: string) => RegisterOptions['required'] = (message: string) => ({
  value: true,
  message: message || ''
})

export const minLengthRule: (num: number) => RegisterOptions['minLength'] = (num) => ({
  value: num,
  message: `length be more than ${num}`
})

export const minRule: (num: number, msg: string) => RegisterOptions['min'] = (num, msg) => ({
  value: num,
  message: msg
})

export const maxRule: (num: number, msg: string) => RegisterOptions['max'] = (num, msg) => ({
  value: num,
  message: msg
})

export const emailValidation: RegisterOptions['validate'] = (email: string): ValidateResult =>
  EMAIL_VALIDATION.test(email)
  || 'Wrong data, please provide correct email.'

export const passwordValidation:
  (
    password: string,
    msg?: string
  ) => ValidateResult = (password, msg) => PASSWORD_VALIDATION.test(password)
  || msg || 'Wrong data, please provide correct password.'

export const confirmPasswordValidation: (
  confirmPassword: string,
  password: string) => ValidateResult = (confirmPassword, password) =>
    confirmPassword === password || 'Entered passwords aren\'t matching.'
