import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { BaseButton } from '../../../core/components/Button'
import { flex, fontFamily } from '../../../core/styles/mixins'
import { CardStyled } from '../../../core/components/Card'

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

export const ContainerStyled = styled.section`
  ${flex({ justify: 'center', align: 'center' })};
  flex-direction: column;
  height: 100%;
  background: linear-gradient(63deg, rgba(0, 82, 217, 0.7) 0, #0052D9 100%);

  ${CardStyled} {
    padding: 48px;
    border: 1px solid ${({ theme }) => theme.colors.grey300};
    box-shadow: 0 4px 30px rgba(0, 82, 217, 0.5);
    border-radius: 9px;
    height: min-content;
  }
`

export const LabelStyled = styled.h1<{ marginBottom?: number }>`
  ${fontFamily('Inter')};
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.darkBlack};
  margin-bottom: ${({ marginBottom }) => (marginBottom || 16)}px;
`

export const LogoStyled = styled.img`
  ${flex({ justify: 'center', align: 'center' })}
  margin: 10px 0 32px 0;
`

export const TitleStyled = styled.h1`
  ${fontFamily('Inter')};
  font-weight: 500;
  font-size: 28px;
  line-height: 34px;
  color: ${({ theme }) => theme.colors.darkBlack};
`

export const ArticleStyled = styled.div`
  width: 100%;
  ${flex({ justify: 'center', align: 'center' })};
  flex-direction: column;
`

export const PasswordFieldContainer = styled.div`
  ${flex({})};
  flex-direction: column;
`

export const NavigationStyled = styled(NavLink)`
  && {
    ${fontFamily('Inter')};
    width: auto;
    color: ${({ theme }) => theme.colors.grey600};
    justify-self: flex-end;
    align-self: flex-end;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    margin-top: 10px;

    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.colors.grey600};
    }
`
