import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { flex, fontFamily } from '../../../core/styles/mixins'

const WrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  ${flex({ justify: 'center', align: 'center' })};
`
const CustomNavigationStyled = styled(NavLink)` 
  &&{
    ${fontFamily('Inter')};
    background: ${({ theme }) => theme.colors.blue500};
    color: ${({ theme }) => theme.colors.white};
    padding: 40px 30px;
    margin: 20px;
    border-radius: 10px;
    
    :hover{
      background: ${({ theme }) => theme.colors.blue700};
    }
  }
`
const Home = () => (
  <WrapperStyled>
    <CustomNavigationStyled to="create-conference">
      Create Conference
    </CustomNavigationStyled>
    <CustomNavigationStyled to="join-conference">
      Join Conference
    </CustomNavigationStyled>
  </WrapperStyled>
)

export default Home
