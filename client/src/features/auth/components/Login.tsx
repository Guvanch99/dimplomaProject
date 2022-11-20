import { useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'
import {
  emailValidation,
  passwordValidation,
  requiredRule
} from '../../../core/utils/formRules'
import CustomInput from '../../../core/components/CustomInput'
import { MailIcon } from '../../../core/components/icons/MailIcon'
import { PasswordIcon } from '../../../core/components/icons/PasswordIcon'
import { useLoginMutation } from '../querries'
import { TFormLoginData } from '../types'
import Card from '../../../core/components/Card'
import Logo from '../../../core/assets/logoMain.jpg'
import { WarningIcon } from '../../../core/components/icons/WarningIcon'
import { ArticleStyled,
  ButtonSubmit,
  ContainerStyled,
  FormStyled,
  LogoStyled,
  NavigationStyled,
  TitleStyled,
  PasswordFieldContainer } from './styled'

const Login: FC = () => {
  const { handleSubmit, control, setError } = useForm<TFormLoginData>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { mutate, isError, error } = useLoginMutation()
  useEffect(() => {
    if (isError) setError('email', { message: error?.message })
  }, [isError])

  return (
    <ContainerStyled>
      <Card>
        <ArticleStyled>
          <TitleStyled>Welcome to</TitleStyled>
          <LogoStyled src={Logo} key="logo" />
        </ArticleStyled>
        <FormStyled onSubmit={handleSubmit(async (data) => {
          mutate(data)
        })}>
          <CustomInput
            size="small"
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: requiredRule('Please fill in all required fields.'),
              validate: emailValidation
            }}
            iconError={<WarningIcon width={20} height={20} />}
            icon={<MailIcon />}
          />
          <PasswordFieldContainer>
            <CustomInput
              type="password"
              size="small"
              name="password"
              control={control}
              placeholder="Password"
              rules={{
                required: requiredRule('Please fill in all required fields.'),
                validate: passwordValidation
              }}
              iconError={<WarningIcon width={20} height={20} />}
              icon={<PasswordIcon />}
            />
            <NavigationStyled to="/register">
              Not have account ?
            </NavigationStyled>
          </PasswordFieldContainer>
          <ButtonSubmit data-testid="submit" type="submit">Log in</ButtonSubmit>
        </FormStyled>
      </Card>
    </ContainerStyled>
  )
}

export default Login
