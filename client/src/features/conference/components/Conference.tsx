import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useRef } from 'react'
import { flex } from '../../../core/styles/mixins'
import { BaseButton } from '../../../core/components/Button'

const WrapperStyled = styled.div`
  ${flex({ justify: 'center', align: 'center' })}
  padding: 20px 40px;
  width: 100%;
  height: 100%;
`

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  
  &>div{
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    height: 0;
  }
`
const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
`

const ButtonGroupStyled = styled.div`
${flex({ justify: 'space-between', align: 'center' })}
`

const ExitButtonStyled = styled(BaseButton)`
&&{
  background: ${({ theme }) => theme.colors.red};
  color:  ${({ theme }) => theme.colors.white};
}
`

const Conference = () => {
  const ref = useRef<HTMLVideoElement | null>(null)
  const { id: conferenceId } = useParams()
  return (
    <WrapperStyled>
      <ContentStyled>
        <div>
          <VideoPlayer/>
        </div>
        <ButtonGroupStyled>
          <ExitButtonStyled>
            x
          </ExitButtonStyled>
        </ButtonGroupStyled>
      </ContentStyled>

    </WrapperStyled>
  )
}

export default Conference
