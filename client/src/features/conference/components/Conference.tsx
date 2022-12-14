import styled from 'styled-components/macro'
import { useRef } from 'react'

import adapter from 'webrtc-adapter'
import { flex } from '../../../core/styles/mixins'
import { BaseButton } from '../../../core/components/Button'
import { useWebSocketContext } from '../../main/state/webSocketState'
import { useWebRTC } from '../hooks/useWebRTC'

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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    & video{
      width: 100%;
      height: 100%;
      background: rebeccapurple;
    }
  }
`
// const VideoPlayer = styled.video`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background: black;
// `

const ButtonGroupStyled = styled.section`
  width: 100%;
  margin-top: 20px;
${flex({ justify: 'center', align: 'center' })}
`

const ExitButtonStyled = styled(BaseButton)`
&&{
  background: ${({ theme }) => theme.colors.red};
  color:  ${({ theme }) => theme.colors.white};
}
`

const Conference = () => {
  const { peersId, videoState } = useWebSocketContext()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useWebRTC(videoRef)
  console.log('peersID', peersId)
  return (
    <WrapperStyled>
      <ContentStyled>
        <div id="streams_container">
          {
            videoState.map((id) => (
              <video
                key={id}
                autoPlay
                playsInline
                ref={videoRef}
                id="local"/>
            ))
          }

          {
            videoState.map(({ videoId, videoRef }) => (
              <video
                style={{ opacity: 0 }}
                ref={videoRef}
                key={videoId}
                autoPlay
                playsInline
                id={videoId}/>
            ))
          }
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
