import styled from 'styled-components/macro'
import { useForm } from 'react-hook-form'
import { flex, fontFamily } from '../../../core/styles/mixins'
import { CardStyled } from '../../../core/components/Card'
import { BaseButton } from '../../../core/components/Button'
import CustomInput from '../../../core/components/CustomInput'
import { passwordValidation, requiredRule } from '../../../core/utils/formRules'
import { WarningIcon } from '../../../core/components/icons/WarningIcon'
import { UserIcon } from '../../../core/components/icons/UserIcon'
import { PasswordIcon } from '../../../core/components/icons/PasswordIcon'
import { TConferenceData } from '../types'
import { useConferenceJoinMutation } from '../querries'

const WrapperStyled = styled.div`
  ${flex({ justify: 'center', align: 'center' })};
  flex-direction: column;
  height: 100%;
  ${CardStyled} {
    padding: 48px;
    border: 1px solid ${({ theme }) => theme.colors.grey300};
    box-shadow: 0 4px 30px rgba(0, 82, 217, 0.5);
    border-radius: 9px;
    height: min-content;
  }
`
export const FormStyled = styled.form`
  width: 300px;
  display: grid;
  grid-template-columns: 300px;
  grid-row-gap: 16px;
`

export const ButtonSubmit = styled(BaseButton)`
  && {
    background: ${({ theme }) => theme.colors.blue500};
    color: ${({ theme }) => theme.colors.white};
    height: 40px;

    &:hover {
      background: ${({ theme }) => theme.colors.blue700};
    }
  }
`

export const TitleStyled = styled.h1`
  ${fontFamily('Inter')};
  font-weight: 500;
  font-size: 28px;
  line-height: 34px;
  color: ${({ theme }) => theme.colors.darkBlack};
  margin-bottom: 10px;
`
const JoinConference = () => {
  const { mutate } = useConferenceJoinMutation()
  const { handleSubmit, control, setError } = useForm<TConferenceData>({
    defaultValues: {
      conferenceId: '',
      conferencePassword: ''
    }
  })
  return (
    <WrapperStyled>
      <CardStyled>
        <TitleStyled>Create a Conference</TitleStyled>
        <FormStyled onSubmit={handleSubmit((data) => {
          mutate(data)
        })}>
          <CustomInput
            size="small"
            name="conferenceId"
            control={control}
            placeholder="Conference ID"
            rules={{
              required: requiredRule('Please fill in all required fields.')
            }}
            iconError={<WarningIcon width={20} height={20} />}
            icon={<UserIcon />}
          />
          <CustomInput
            size="small"
            name="conferencePassword"
            control={control}
            placeholder="Conference Password"
            rules={{
              required: requiredRule('Please fill in all required fields.'),
              validate: passwordValidation
            }}
            iconError={<WarningIcon width={20} height={20} />}
            icon={<PasswordIcon />}
          />
          <ButtonSubmit type="submit">Submit</ButtonSubmit>
        </FormStyled>
      </CardStyled>
    </WrapperStyled>
  )
}

export default JoinConference
