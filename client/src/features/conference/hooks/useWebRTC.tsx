// import { useEffect, useRef, useState } from 'react'
// import { createPeer } from '../utils/conferenceUtils'
// import { initUserMedia } from '../utils/webrtcUtils'
//
// export const useWebrtc = (streamID?: string) => {
//   console.log('1')
//   const setSubscribeParams = useSubscribeRTC(() => undefined)
//   // const setStreamId = useInitWebRtc()
//   console.log('2')
//   const peerRefFront = useRef<RTCPeerConnection | null>(null)
//   const faceVideoRef = useRef<HTMLVideoElement | null>(null)
//   const streamFront = useRef<MediaStream | null>(null)
//   console.log('3')
//   const { streamClient: client, setStreamTopic } = useStreamClient()
//   console.log('4')
//   useEffect(() => {
//     if (streamID) {
//       setStreamTopic(`connect/${streamID}/server`)
//     }
//   }, [streamID])
//   useEffect(() => {
//     console.log('5')
//     if (!streamID) {
//       return
//     }
//
//     if (faceVideoRef.current) {
//       console.log('here')
//       initUserMedia(faceVideoRef).then((stream) => {
//         console.log('s', stream)
//         streamFront.current = stream
//       })
//     }
//   }, [streamID, faceVideoRef, faceVideoRef.current])
//
//   useEffect(() => {
//     console.log('pidor', {
//       streamID,
//       client,
//       c: streamFront.current
//     })
//     if (streamID && client && streamFront.current) {
//       // client.on('connect', () => {
//       console.log('connected')
//       createPeer(
//         {
//           peer: peerRefFront,
//           stream: streamFront.current!,
//           client,
//           streamID,
//           streamType: 'FRONT_CAMERA'
//         }
//       ).then(() => {
//         setSubscribeParams({ peerRef: peerRefFront, client })
//       })
//       // })
//     }
//   }, [streamID, client, streamFront, streamFront.current])
//   useEffect(() => {
//     if (client) {
//       client.on('reconnect', (error: any) => {
//         console.log('reconnecting:', error)
//       })
//       client.on('disconnect', (packet: any) => {
//         console.log(`disconnect, ${packet}`)
//       })
//       client.on('offline', () => {
//         console.log('offline')
//         client?.end()
//       })
//       client.on('error', (error: any) => {
//         console.log('Connection failed:', error)
//       })
//       client.on('close', () => {
//         console.log('Disconnected')
//         client?.end()
//       })
//     }
//   }, [client])
//   return faceVideoRef
// }
//
// function useSubscribeRTC(callback: () => void) {
//   const [subscribeParams, setSubscribeParams] = useState<any>()
//
//   useEffect(() => {
//     let list: any[] = []
//     console.log('trueish', subscribeParams && subscribeParams.client && subscribeParams.peerRef)
//     if (subscribeParams && subscribeParams.client && subscribeParams.peerRef) {
//       console.log('subscribe')
//       const { peerRef, client } = subscribeParams
//       // client.on('connect', () => {
//       console.log('subscribe connect')
//       client.on('message', (topic: any, message: any) => {
//         console.log('begin coming message')
//         const object = JSON.parse(message)
//         console.log('object', object)
//         if (object.type === 'STREAM_NOT_STARTED') {
//           callback()
//         }
//         if (object.type === 'STREAM_STARTED') {
//           console.log('STREAM_STARTED_object', object)
//           client.end()
//         }
//
//         if (object.type === 'ICE_EXCHANGE') {
//           console.log('ICE_EXCHANGE', object)
//           const iceCandidate = new RTCIceCandidate({
//             candidate: object.payload.candidate,
//             sdpMid: object.payload.sdpMid,
//             sdpMLineIndex: object.payload.sdpMLineIndex
//           })
//           if (peerRef.current && peerRef.current.remoteDescription) {
//             if (list.length) {
//               list.forEach((item) => (
//                 peerRef.current!.addIceCandidate(item.iceCandidate)
//               ))
//               list = []
//             }
//             peerRef.current.addIceCandidate(iceCandidate)
//           } else {
//             list.push(iceCandidate)
//           }
//         }
//
//         if (object.type === 'ANSWER') {
//           console.log('ANSWER', object)
//           const { sdp } = object.payload
//           if (sdp && peerRef.current && !peerRef.current.currentRemoteDescription) {
//             const answerRTC = new RTCSessionDescription({
//               sdp,
//               type: 'answer'
//             })
//             peerRef.current.setRemoteDescription(answerRTC)
//           }
//         }
//       })
//     }
//   }, [subscribeParams?.client, subscribeParams?.peerRef])
//   return setSubscribeParams
// }
