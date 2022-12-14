import constate from 'constate'
import { createRef, useCallback, useEffect, useRef, useState } from 'react'

const useWebSocket = () => {
  const [peersId, setPeersId] = useState<any>([])
  const [peers, setPeers] = useState<any>(new Map())
  const [videoState, videoSetState] = useState<any[]>([
    {
      videoId: '1111',
      videoRef: createRef()
    }
  ])
  const wsClientRef = useRef<WebSocket | null>(new WebSocket('ws://3.70.9.35:8080/streaming/actions'))

  useEffect(() => {
    if (peersId.length) {
      videoSetState(peersId.map((id: any) => ({
        videoId: id,
        videoRef: createRef()
      })))
    }
  }, [peersId])

  useEffect(() => {
    if (wsClientRef && wsClientRef.current) {
      wsClientRef.current.onerror = (error) => {
        console.log(`[WS] Error ${error}`)
        console.log(`[WS] Error ${(error as any).message}`)
      }

      wsClientRef.current.onopen = () => {
        console.log('[WS] Connection established')
      }
    }
    return () => {
      if (wsClientRef.current && wsClientRef.current.readyState === 1) {
        wsClientRef.current.close()
      }
    }
  }, [wsClientRef])

  const sendMessageCallBack = useCallback((message: any) => {
    const jsonMessage = JSON.stringify(message)
    console.log(`[WS] Sending message: ${jsonMessage}`)
    console.log('json', jsonMessage)
    wsClientRef?.current?.send(jsonMessage)
  }, [wsClientRef])
  return {
    wsClientRef,
    sendMessage: sendMessageCallBack,
    setPeers,
    peers,
    setPeersId,
    peersId,
    videoState
  }
}

export const [WebSocketProvider, useWebSocketContext] = constate(useWebSocket)
