import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useWebSocketContext } from '../../main/state/webSocketState'
import { createRoom, createRTCEndpoint, joinRoom } from '../../../core/utils/webrtcUtils'

export const useWebRTC = (videoRef: any) => {
  const [id, setId] = useState('')
  const localStream = useRef(null)
  const { id: conferenceId } = useParams()
  const { sendMessage } = useWebSocketContext()
  const { state } = useLocation()
  useSubscribe(localStream)

  useEffect(() => {

  }, [])
  useEffect(() => {
    if (videoRef && videoRef.current) {
      if (state.type === 'CREATE') {
        createRoom({
          localStream,
          localVideoTag: videoRef,
          sendMessage,
          roomId: conferenceId!,
          rtcSessionId: `${Math.random()}`
        }).then(() => console.log('success'))
      } else {
        joinRoom({
          localStream,
          localVideoTag: videoRef,
          sendMessage,
          roomId: conferenceId!,
          rtcSessionId: `${Math.random()}`
        })
      }
    }
  }, [localStream, videoRef])
}

const useSubscribe = (localStream: any) => {
  const { peers, wsClientRef, setPeers, setPeersId, sendMessage } = useWebSocketContext()
  useEffect(() => {
    if (wsClientRef && wsClientRef.current) {
      wsClientRef.current.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data)
        if (type === 'ICE_EXCHANGE') {
          const { endpointId } = payload
          const peer = peers.get(endpointId)
          const rtcIceCandidate = new RTCIceCandidate(
            {
              candidate: payload.candidate,
              sdpMid: payload.sdpMid,
              sdpMLineIndex: payload.sdpMLineIndex
            }
          )

          peer.addIceCandidate(rtcIceCandidate).catch((e: any) => {
            console.log('Failure during addIceCandidate(): ', e)
          })
        }
        if (type === 'SDP_EXCHANGE') {
          const { endpointId } = payload
          const peer = peers.get(endpointId)
          const { sdp } = payload
          const correctSDP = new RTCSessionDescription({
            type: 'answer',
            sdp
          })
          console.log('Setting answer: ', correctSDP)
          peer.setRemoteDescription(correctSDP)
        }
        if (type === 'CREATE_RTC_ENDPOINT') {
          const { endpointId } = payload
          createRTCEndpoint({
            id: endpointId,
            peers,
            sendMessage,
            setPeers,
            localStream: localStream.current,
            setPeersId
          })
        }
      }
    }
  }, [wsClientRef, wsClientRef.current, localStream, localStream.current])
}
