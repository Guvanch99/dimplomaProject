import styled from 'styled-components/macro'
import React from 'react'
import { Menu, MenuItem, MenuProps } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { flex, fontFamily } from '../../../core/styles/mixins'
import { ArrowDownIcon } from '../../../core/components/icons/ArrowDownIcon'
import { getFirstLetter } from '../utils/headerUtils'
import { useAuthContext } from '../../auth/state/useAuthState'
import Logo from '../../../core/assets/logoMain.jpg'

export const headerHeight = 48

type TButtonSvgProps = {
  isOpen: boolean
}

const LogoStyled = styled.img`
  height: 40px;
  cursor: pointer;
`

const ContainerStyled = styled.div`
  ${flex({ justify: 'space-between', align: 'center' })};
  grid-area: header;
  position: relative;
  width: 100%;
  z-index: 22;
  box-shadow: ${({ theme }) => theme.colors.shadow200};
  height: ${headerHeight}px;
  padding: 6px 20px 6px 16px;
  background: ${({ theme }) => theme.colors.white};
`
const ButtonSvgContainer = styled.button<TButtonSvgProps>`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: ${({ isOpen, theme }) => (isOpen ? theme.colors.grey200 : 'transparent')};
`

const ContentStyled = styled.div`
  ${flex({ justify: 'center', align: 'center' })};
`

const SubTitle = styled.p`
  ${fontFamily('Inter')};
  color: ${({ theme }) => theme.colors.darkBlack};
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  margin: 0 2px 0 8px;
`

export const UserIcon = styled.div`
  ${fontFamily('Inter')};
  ${flex({ justify: 'center', align: 'center' })};
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.blue500};
  border-radius: 50%;
  line-height: 24px;
  font-weight: 500;
`

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))`
&& .MuiPaper-root{
  border-radius: 3px;
  margin-top:2px;
  min-width: 160px;
  color: ${({ theme }) => theme.colors.darkBlack};
  box-shadow: ${({ theme }) => theme.colors.shadow200};
 
  & .MuiMenuItem-root{
    ${fontFamily('Inter')};
    color: ${({ theme }) => theme.colors.darkBlack};
    padding: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
}
`

const Header = () => {
  const { authData } = useAuthContext()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)
  const handleNavigate = (url: string) => navigate(`/${url}`)

  const username = authData?.username || 'Guvanch'

  if (!username) {
    return null
  }

  const firstLetter = getFirstLetter(username)
  return (
    <ContainerStyled>
      <LogoStyled onClick={() => handleNavigate('')} src={Logo} alt="logo"/>
      <ContentStyled>
        <UserIcon>{firstLetter}</UserIcon>
        <SubTitle>{username}</SubTitle>
        <ButtonSvgContainer
          isOpen={open}
          onClick={handleClick}>
          <ArrowDownIcon
            onClick={handleClick}
          />
        </ButtonSvgContainer>
        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleNavigate('history')} disableRipple>
            History
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('logout')} disableRipple>
            Log out
          </MenuItem>
        </StyledMenu>
      </ContentStyled>
    </ContainerStyled>
  )
}

export default Header
