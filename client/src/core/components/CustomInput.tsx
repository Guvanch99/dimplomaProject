import { FC, ReactNode } from 'react'
import { Control, useController } from 'react-hook-form'
import { InputAdornment, TextField } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import styled, { useTheme } from 'styled-components/macro'
import { fontFamily } from '../styles/mixins'

export const CustomTextField = styled(TextField)`
  && {
    margin: 0;
  }

  && .css-1gywuxd-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${({ theme }) => theme.colors.red};
  }

  && .MuiOutlinedInput-root {
    padding: 0 10px;
  }

  && input {
    padding: 10px 0;
    height: 20px;

    ::placeholder {
      ${fontFamily('Inter')};
      color: ${({ theme }) => theme.colors.darkBlack};
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }
  }

  && .MuiFormHelperText-root {
    ${fontFamily('Inter')};
    color: ${({ theme }) => theme.colors.red};
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    letter-spacing: 0;
    margin: 4px 0 0 0;
  }
`

type TProps = {
  name: string
  control: Control<any>
  rules?: RegisterOptions
  handleChange?: (value: string) => string
  icon?: ReactNode,
  iconError?: ReactNode
  iconPosition?: 'start' | 'end'
} & TextFieldProps

const CustomInput: FC<TProps> = ({
  control,
  name,
  rules,
  icon,
  iconError,
  iconPosition,
  handleChange,
  InputProps,
  ...rest
}) => {
  const {
    field,
    formState: { errors }
  } = useController({
    name,
    control,
    rules
  })

  const { colors: { red } } = useTheme()

  const [fieldName, idx, fieldSubName] = name.split('.')
  // @ts-ignore
  return (
    <CustomTextField
      {...field}
      {...rest}
      onChange={(e) => {
        // eslint-disable-next-line no-unused-expressions
        handleChange ? field.onChange(handleChange(e.target.value)) : field.onChange(e)
      }}
      fullWidth
      sx={{ marginTop: 1 }}
      InputProps={{
        inputProps: {
          maxLength: 255,
          'aria-label': fieldName
        },
        endAdornment: errors[name]
          ? <InputAdornment sx={{ color: red }} position="end">{iconError}</InputAdornment>
          : undefined,
        startAdornment: icon
          ? (
            <InputAdornment
              sx={errors[name] && { color: red }}
              position={iconPosition || 'start'}>
              {icon}
            </InputAdornment>
          )
          : undefined,
        ...InputProps
      }}
      // @ts-ignore
      error={errors.rules ? !!errors[fieldName]?.[Number(idx)]?.[fieldSubName] : !!errors[name]}
      // @ts-ignore
      helperText={errors[name] ? <span data-testid={`${fieldName}-error`}>{errors[name].message}</span> : ''}
    />
  )
}

export default CustomInput
